const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = require('./Category')
const Category = mongoose.model('category',CategorySchema)

const ProductSchema = new Schema({
    category:{
      type: mongoose.ObjectId,
      ref: Category
    },
    name:{
        type: String,
        required: true
    },
    meta_name:{
      type: String,
      default: ''
    },
    link: String,
    status:{
      type: Number,
      min:0,//0:sold out,1:availabe,2:hot
      max: 2,
      default:0
    },
    price:{
      type: Number,
      min:0,
      default: 0
    },
    discount:{
      type: Number,
      min: 0,
      default:0
    },
    created_at: {
        type: Date,
        default:Date.now()
    }
})

module.exports = ProductSchema
