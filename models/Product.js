const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    meta_name:{
      type: String,
      default: ''
    },
    category: String,
    link: String,
    status:{
      type: Number,
      min:0,//0:sold out,1:availabe,2:hot
      max: 2
    },
    price:{
      type: Number,
      min:0
    },
    discount:{
      type: Number,
      min: 0
    },
    created_at: {
        type: Date,
        default:Date.now()
    }
})

module.exports = ProductSchema
