const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SliderSchema = new Schema({
    link: String,
    created_at: {
        type: Date,
        default:Date.now()
    }
})

module.exports = SliderSchema
