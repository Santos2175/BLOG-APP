const path = require('path')
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const Blog = require('./models/blog')

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const exp = require('constants')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')

const app = express();
const PORT  = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(e=>console.log("MongoDB connected...."))

//view engine setting
app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

//middlewares
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

//Route
app.get('/', async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render('home',{
        user:req.user,
        blogs:allBlogs
    })
})

app.use('/user', userRoute)
app.use('/blog', blogRoute)
app.use(express.static(path.resolve('./public')))

app.listen(PORT,()=>console.log(`server connected at PORT: ${PORT}`))