const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PublisherSchema = require('./models/Publisher')
const Publisher = mongoose.model('publisher',PublisherSchema)

const CategorySchema = new Schema({
    publisher:{
      type: mongoose.ObjectId,
      ref: Publisher
    },
    name:{
        type: String,
        required: true
    },
    meta_name:{
      type: String,
      default: ''
    },
    amount:{
      type: Number,
      min:0,
      default: 0
    }
})

module.exports = CategorySchema
