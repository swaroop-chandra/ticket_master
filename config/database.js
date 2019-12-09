const mongoose=require('mongoose')
const connectDB=()=>{
    mongoose.connect( process.env.MONGODB_URI ,{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})
    .then(()=>{
        console.log('connect to DB: '+ process.env.MONGODB_URI)
    })
    .catch((err)=>{
        console.log(err)
        console.log('error to db' + process.env.MONGODB_URI)
    })
}
module.exports=connectDB

// mongoose.connect( process.env.MONGODB_URL || 'mongodb+srv://swaroop:<milagres666>@cluster0-sm31f.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})