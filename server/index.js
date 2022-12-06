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


// routes
app.get("/",(req,res)=>{
	res.send("Space shooter says hello")
})

app.post("/player",(req,res)=>{
    console.log(req.query)
    Player.create(req.body,(err,data)=>{
        if(!err){
            res.status(200).send({status:'ok',msg:'user created'})
        }
        else{
            res.status(500).send({status:'error',msg:err})
        }
    })
})

app.get('/player',(req,res)=>{
    console.log(req.body)
    console.log(req.query)
    Player.findOne(req.body,(err,data)=>{
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

// app.get('/score',(req,res)=>{

// })

app.listen(PORT,()=>{
    console.log("Listening on PORT :",PORT)
})
