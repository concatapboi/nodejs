const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    meta_name:{
      type: String,
      default: ''
    },
    publisher: String,
    amount:{
      type: Number,
      min:0
    }
})

module.exports = CategorySchema
