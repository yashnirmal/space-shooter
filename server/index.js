const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Player = require('./schemas/Player.js')
const Ship = require('./schemas/Ship.js')
const Cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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
app.use(Cors())

// routes
app.get("/",(req,res)=>{
	res.send("Space shooter says hello")
})

app.post("/signup",(req,res)=>{

    // const hashedPass = bcrypt.hash(req.body.password,10)

    Player.create({username:req.body.username,password:req.body.password},(err,data)=>{
        console.log(err,data)
        if(!err && data){
            let token = jwt.sign({username:data.username,id:data._id},process.env.SECRET_KEY)
            res.status(200).send({status:'ok',msg:'user created',user:token})
        }
        else{
            res.status(500).send({status:'error',msg:'username is already in use'})
        }
    })
})

app.post('/login',(req,res)=>{
    Player.findOne({username:req.body.username,password:req.body.password},(err,data)=>{
        console.log(err,data);
        if(data){
            let token = jwt.sign({username:data.username,id:data._id},process.env.SECRET_KEY)
            res.status(200).send({status:'ok',msg:'player found',user:token})
        }
        else{
            res.status(400).send({status:'error',msg:'player not found,please check username and password'})
        }
    })
})

app.get('/score/:id',(req,res)=>{
    let _id = req.params.id
    Player.findById(_id,(err,data)=>{
        if(!err){
            if(!data){
                res.status(500).send({status:'error',msg:'user not found'})
            }
            else{
                res.status(200).send({status:'ok',msg:'user found',data:data.score})
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


app.listen(PORT,()=>{
    console.log("Listening on PORT :",PORT)
})
