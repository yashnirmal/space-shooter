const mongoose = require('mongoose')

const shipModel = mongoose.Schema({
	name:{type:String,required:true,unique:true},
	file:{type:String,required:true,unique:true},
	price:{type:Number,required:true}
})

module.exports = mongoose.model('Ship',shipModel)