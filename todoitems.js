const mongoose=require('mongoose')
const todoitemsSchema= new mongoose.Schema({
    items:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('demo',todoitemsSchema)

