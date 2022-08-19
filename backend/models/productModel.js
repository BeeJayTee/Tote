const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        require: true
    }, 
    minPurchase: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)