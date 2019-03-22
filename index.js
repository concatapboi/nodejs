const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const flash = require('connect-flash')
const session = require('express-session')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const fileFilter = (req, file, cb)=>{
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg')
        return cb(new Error('File not allow'))
    cb(null, true)
}
const upload = multer({storage,fileFilter, limits:{fileSize:102400}}) // 100kb

const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))


app.use(session({
    secret: '7654323gfdssd',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())
app.use((req,res,next)=>{
    res.locals.error_message = req.flash('error_message')
    res.locals.success_message = req.flash('success_message')
    next();
})
mongoose.connect('mongodb://localhost:27017/singer1602',{
    useNewUrlParser:true,
    useCreateIndex:true,
})
mongoose.connection
.then(()=>console.log('Connected'))
.catch(e=>console.log(e.message))

//Frontend
//Home
app.get('/',(req,res)=>{
  res.render('Frontend/index',{ title : 'Home'})
})
app.get('/products',(req,res)=>{
  res.render('Frontend/product',{ title : 'Product'})
})
app.get('/cart',(req,res)=>{
  res.render('Frontend/cart',{ title : 'Cart'})
})
app.get('/checkout',(req,res)=>{
  res.render('Frontend/checkout',{ title : 'Checkout'})
})
app.get('/contact',(req,res)=>{
  res.render('Frontend/contact',{ title : 'Contact'})
})
app.listen(3000,()=>console.log('Server start on port 3000'))
