const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const flash = require('connect-flash')
const session = require('express-session')
const PublisherSchema = require('./models/Publisher')
const CategorySchema = require('./models/Category')
const ProductSchema = require('./models/Product')

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
mongoose.connect('mongodb://localhost:27017/nodejsdb',{
    useNewUrlParser:true,
    useCreateIndex:true,
})
mongoose.connection
.then(()=>console.log('Connected'))
.catch(e=>console.log(e.message))
//Backend
const Publisher = mongoose.model('publisher',PublisherSchema)
const Category = mongoose.model('category',CategorySchema)
const Product = mongoose.model('product',ProductSchema)
//Add
app.get('/add',(req,res)=>{
  res.render('add')
})
//Add Publisher
app.get('/addpublisher',(req,res)=>{
  res.render('addPublisher',{title : 'PUBLISHER'})
})
app.post('/addpublisher',(req,res)=>{
  console.log(req)
  const { name, meta_name } = req.body
        Publisher.create({
            name: name ,
            meta_name: meta_name
        })
        .then(()=>{
            res.redirect()
        })
        .catch(e=>console.log(e.message))
})
//Add Category
app.get('/addcategory',(req,res)=>{
  Publisher.find()
    .then(dataPublisher=>{

     res.render('addCategory',{title : 'CATEGORY',dataPublisher})
    })
    .catch(e=>console.log(e.message));
})
app.post('/addcategory',(req,res)=>{
  const { category, name, meta_name, amount } = req.body
        Category.create({
          category: category,
            name: name ,
            amount: amount,
            meta_name: meta_name
        })
        .then(()=>{
            res.redirect()
        })
        .catch(e=>console.log(e.message))
})
//Add Product
app.get('/addproduct',(req,res)=>{
  Category.find()
    .then(dataCategory=>{

     res.render('addProduct',{title : 'PRODUCT',dataCategory})
    })
    .catch(e=>console.log(e.message));
})
app.post('/addproduct',(req,res)=>{
    upload.single('link')(req,res,err=>{
        if(err){
            return res.send(err.message)
        }
        const { name, meta_name, category, status, price, discount } = req.body
        Product.create({
            name: name ,
            meta_name: meta_name,
            category: category,
            status: status,
            price: price,
            discount: discount,
            link: req.file ? req.file.filename : 'default.jpg'
        })
        .then(()=>{
            res.redirect()
        })
        .catch(e=>console.log(e.message))
    })
})
//Frontend
//Home
app.get('/',(req,res)=>{
  res.render('Frontend/index',{ title : 'Home'})
})
//Product
app.get('/products',(req,res)=>{
  res.render('Frontend/product',{ title : 'Product'})
})
//Cart
app.get('/cart',(req,res)=>{
  res.render('Frontend/cart',{ title : 'Cart'})
})
//Checkout
app.get('/checkout',(req,res)=>{
  res.render('Frontend/checkout',{ title : 'Checkout'})
})
//Contact
app.get('/contact',(req,res)=>{
  res.render('Frontend/contact',{ title : 'Contact'})
})
app.listen(process.env.PORT || 3000,()=>console.log('Server started!'))
