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
                score:el.score[type]            }
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

app.get('/playerships/:id',(req,res)=>{
    const _id = req.params.id
    Player.findOne({_id},(err,data)=>{
        if(!err && data){
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
    
    const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price:price.id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: "http://localhost:3000/payment?success=true",
    cancel_url: "http://localhost:3000/payment?canceled=true",
    metadata:{skinid:req.body.skinid,playerid:req.body.playerid}
  });

  res.redirect(303, session.url);
});


app.post('/webhook',bodyParser.raw({type:'application/json'}),(req,res)=>{
    const payload = req.body
    console.log(payload)
    const signature = req.headers['stripe-signature']

    let event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SIGNING_SECRET);


    // console.log(event)

    if(event?.type==='checkout.session.completed'){
        const metadata = event.data?.object?.metadata;
        const paymentStatus = event.data?.object?.payment_status;

        if(paymentStatus==='paid'){
            console.log("Payment succeeded")
            // append the ship to the player
            Player.updateOne({_id:metadata.playerid},
                {$push:{ships:metadata.skinid}},(err,data)=>{
                    if(!err && data){
                        res.status(200).send({status:'ok',msg:'ship added to players collection'})
                    }else{
                        res.status(500).send({status:'ok',msg:'unable to add ship to players collection'})
                    }
                })
        }else{
            console.log("Payment Failed")
        }
    }


    res.status(200).end()
})

app.listen(PORT,()=>{
    console.log("Listening on PORT :",PORT)
})
