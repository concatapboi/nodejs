const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublisherSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    meta_name:{
      type: String,
      default: ''
    }
})

module.exports = PublisherSchema
