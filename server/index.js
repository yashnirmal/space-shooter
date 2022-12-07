const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Player = require('./schemas/Player.js')
require('dotenv').config()

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
app.use(express.json())

// routes
app.get("/",(req,res)=>{
	res.send("Space shooter says hello")
})

app.post("/player",(req,res)=>{
    Player.create(req.body,(err,data)=>{
        if(!err){
            res.status(200).send({status:'ok',msg:'user created'})
        }
        else{
            res.status(500).send({status:'error',msg:err})
        }
    })
})

app.get('/player/:id',(req,res)=>{
    let _id = req.params.id
    Player.findById(_id,(err,data)=>{
        if(!err){
            if(!data){
                res.status(500).send({status:'error',msg:'user not found'})
            }
            else{
                res.status(200).send({status:'ok',msg:'user found',data})
            }
        }
        else{
            res.send(500).send({status:'error',msg:'server error'+err})
        }
    })
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

app.get('/usernames/:username',(req,res)=>{
    console.log(req.params)
    Player.find({username:req.params.username},(err,data)=>{
        console.log(err,data)
        if(data.length!=0){
            // entered username is not unique
            res.status(500).send({status:'error',msg:'username already exist'})
        }
        else{
            // unique username
            res.status(200).send({status:'ok',msg:'unique username'})
        }
    })
})

app.listen(PORT,()=>{
    console.log("Listening on PORT :",PORT)
})
