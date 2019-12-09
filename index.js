const express=require('express')
const cors=require('cors')
const connectDB=require('./config/database')
const router=require('./config/routes')
const app=express()
const PORT=process.env.PORT || 3026
const path=require('path')


app.use(express.json())

connectDB()
app.use(cors())

app.use(express.static(path.join(__dirname,'./client/build/')))

app.use('/api',router)

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.listen(PORT,()=>{
    console.log('Listening to port',PORT)
})