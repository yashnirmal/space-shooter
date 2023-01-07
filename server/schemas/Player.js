const mongoose = require('mongoose')

const player = mongoose.Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    score:{
        easy:{type:Number,default:0},
        medium:{type:Number,default:0},
        hard:{type:Number,default:0},
        impossible:{type:Number,default:0}
    },
    ships:{type:[String],default:[]}
}) 

module.exports = mongoose.model('Player',player)