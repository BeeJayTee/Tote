const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    producerID: {
        type: String,
        required: true
    },
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
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)