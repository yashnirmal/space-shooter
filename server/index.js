const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Player = require('./schemas/Player.js')
const Ship = require('./schemas/Ship.js')
const Cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const upload = multer()
const bodyParser = require('body-parser')
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_PUBLIC_KEY);
const PORT = 5050 || process.env.PORT
// connnections
mongoose.connect(process.env.MONGO_CONN_URL)
.then(()=>{
    console.log("Connected to DB")
})
.catch(err=>{
    console.log("Error spotted :",err)
})

//middlewares

// for parsing application/json
app.use(express.json()); 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
app.use(Cors())


// routes
app.get("/",(req,res)=>{
	res.send("Space shooter says hello")
})

app.post("/signup",(req,res)=>{

    Player.findOne({username:req.body.username},(err,data)=>{
        if(!err && data){
            res.status(400).send({status:'error',msg:'username already exist try using another one'})
        }
    })

    bcrypt.hash(req.body.password,10)
    .then(hashedPass=>{
        Player.create({username:req.body.username,password:hashedPass},(err,data)=>{
            console.log(err,data)
            if(!err && data){
                let token = jwt.sign({username:data.username,id:data._id},process.env.SECRET_KEY)
                res.status(200).send({status:'ok',msg:'user created',user:token})
            }
            else{
                res.status(500).send({status:'error',msg:'There is something wrong with the server, please try again after sometime'})
            }
        })
    })
    
})

app.post('/login',(req,res)=>{
    Player.findOne({username:req.body.username},(err,data)=>{
        console.log(err,data);
        if(data){
            bcrypt.compare(req.body.password,data.password)
            .then((isValidPass)=>{
                if (isValidPass) {
                    let token = jwt.sign({username:data.username,id:data._id},process.env.SECRET_KEY)
                    res.status(200).send({status:'ok',msg:'player found',user:token})
                }
                else{
                    res.status(400).send({status:'error',msg:'you have entered a wrong password'})
                }
            })
            .catch(()=>{
                console.log("There is something wrong with the server, please try again after sometime")
            })
            
        }
        else{
            res.status(400).send({status:'error',msg:'player do not exist, please check username'})
        }
    })
})

app.get('/score/:id',(req,res)=>{
    let _id = req.params.id
    Player.findOne({_id},(err,data)=>{
        console.log(err ,data)
        if(!err && data){
            res.status(200).send({status:'ok',msg:'user found',data:data.score})
        }
        else{
            res.status(500).send({status:'error',msg:'server error, please try again after sometime'})
        }
    })
})

app.get("/scoreboard/:id",(req,res)=>{
    let id = parseInt(req.params.id);
    let type="easy";
    switch(id){
        case 0:
        type="easy"
        break;
        case 1:
        type="medium";
        break;
        case 2:
        type="hard";
        break;
        case 3:
        type="impossible";
        break;
        default:
        type="easy";
    }
    
    Player.find({}).sort(`score.${type}`).limit(10)
    .then(result=>{
        let data = result.map((el)=>{
            return {
                username:el.username,
                score:el.score[type]        
            }
        })
        res.status(200).send({status:'ok',msg:'sorted data returned',data})
    })
    .catch((err)=>{
        res.status(500).send({status:'error',msg:'server error try after sometime'})
    })
    // console.log(result)

})

app.post('/score/:id',(req,res)=>{
    let _id = req.params.id
    console.log(req.body,req.params)
    Player.updateOne({_id:_id},{$set:{score:req.body}},(err,data)=>{
        if (!err) {
          res.status(200).send({ status: "ok",msg:"updated scsore" });
        } else {
          console.log(err);
          res.status(500).send({ status: "error", msg: "invalid playerid" });
        }
    })
})


app.get('/playerships/:id',async (req,res)=>{
    const _id = req.params.id
    Player.findOne({_id},(err,data)=>{
        if(!err && data){
            console.log(data.ships)
            res.status(200).send({status:'ok',msg:'getting all ships',data:data.ships})
        }
        else{
            res.status(500).send({status:'error',msg:'server error please try again later'})
        }
    })
})

app.get('/ships',(req,res)=>{
    Ship.find({},(err,data)=>{
        if(!err && data){
            res.status(200).send({status:'ok',msg:'all ships fetched',data:data})
        }
        else{
            res.status(500).send({status:'error',msg:"something went wrong"})
        }
    })
})

app.get('/ship/:id',(req,res)=>{
    const _id = req.params.id
    Ship.findOne({_id},(err,data)=>{
        if(!err && data){
            res.status(200).send({status:'ok',msg:'got the ships data',data:data})
        }
        else{
            res.status(500).send({status:'ok',msg:'cannot get ships data, try after some time'})
        }
    })
})


app.post('/checkout', async (req, res) => {
    // making a stripe product object
    const product = await stripe.products.create({
      name: 'Spaceship Skin',
    });

    //making a stripe price object 
    const price = await stripe.prices.create({
      unit_amount: req.body.skinprice*100,
      currency: 'inr',
      product: product.id,
    });

    const customer = await stripe.customers.create({
        metadata:{
            skinid:req.body.skinid,
            playerid:req.body.playerid
        }

    })
    
    const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price:price.id,
        quantity: 1,
      },
    ],
    customer:customer.id,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/payment?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/payment?canceled=true`,
  });

  res.redirect(303,session.url);
});


async function addShipToPlayer(playerId,skinId){
    try{
        const result = await Player.updateOne({username:playerId},{$push:{ships:skinId}})
        console.log("Ship Added")
        // res.status(200).send({status:'ok',msg:'New ship unlocked'})
    }
    catch(err){
        console.log("Erro in Adding ship",err)
        // res.status(500).send({status:'error',msg:'server error! ship not added'})
    }
}


app.post('/webhook',bodyParser.raw({type:'application/json'}),async (req,res)=>{
    const payload = req.body
    const signature = req.headers['stripe-signature']

    let data;
    let eventType;
    // if(process.env.STRIPE_WEBHOOK_SIGNING_SECRET){
    //     let event;
    //     try {
    //         event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SIGNING_SECRET);
    //         console.log("Webhook verified")
    //     } catch (err) {
    //         return res.status(400).send(`Webhook Error: ${err.message}`);
    //     }
    //     data = event.data.object;
    //     eventType = event.type
    // }else{
        data = req.body.data.object
        eventType = req.body.type
    // }


    if(eventType==='checkout.session.completed'){
        stripe.customers.retrieve(data.customer)
        .then((customer)=>{
            let playerId = customer.metadata.playerid
            let skinId = customer.metadata.skinid
            console.log(skinId,"added to",playerId)
            addShipToPlayer(playerId,skinId)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    res.status(200).end()
})

app.listen(PORT,()=>{
    console.log("Listening on PORT :",PORT)
})
