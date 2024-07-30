const path = require('path')
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')

const userRoute = require('./routes/user')
const exp = require('constants')

const app = express();
const PORT  = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(e=>console.log("MongoDB connected...."))

//view engine setting
app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

//middlewares
app.use(express.urlencoded({extended:false}))

//Route
app.get('/', (req,res)=>{
    res.render('home')
})

app.use('/user', userRoute)

app.listen(PORT,()=>console.log(`server connected at PORT: ${PORT}`))