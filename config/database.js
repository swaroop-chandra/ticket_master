const mongoose=require('mongoose')
const connectDB=()=>{
    mongoose.connect('mongodb://localhost:27017/july-ticket-master',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})
    .then(()=>{
        console.log('connect to DB')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connectDB