const mongoose=require('mongoose')
const validator=require('validator')
const Schema=mongoose.Schema

const ticketSchema=new Schema({
    customer:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    },
    
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Department'
    },
    employees:[{
        type:Schema.Types.ObjectId,
        ref:'Employee'
    }],
    priority:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isResolved:{
        type:Boolean,
        default:false
    },
    code:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
    
})

const Ticket=mongoose.model("Ticket",ticketSchema)

module.exports=Ticket