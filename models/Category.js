const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    publisher: String,
    amount:{
      type: Number,
      min:0
    }
})

module.exports = CategorySchema
