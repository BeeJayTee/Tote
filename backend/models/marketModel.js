const mongoose = require('mongoose')
const Schema = mongoose.Schema

const makeID = (length) => {
    let result = ''
    let characters = 'ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()'
    let charLength = characters.length
    for (let i=0; i<length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLength))
    }
    return result
}

const marketModel = new Schema ({
    adminName: {
        type: String,
        requrired: true,
        default: null
    },
    adminEmail: {
        type: String,
        requrired: true,
        default: null
    },
    marketName: {
        type: String,
        required: true,
        default: null
    },
    marketID: {
        type: String,
        required: true,
        default: makeID(7)
    },
    marketAddress: {
        street: {
            type: String,
            required: true,
            default: null
        },
        streetSec: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true,
            default: null
        },
        province: {
            type: String,
            required: false,
            default: null
        },
        country: {
            type: String,
            required: true,
            default: null
        },
        postalCode: {
            type: String,
            required: true,
            default: null
        }
    },
    mailingAddress: {
        street: {
            type: String,
            required: true,
            default: null
        },
        streetSec: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true,
            default: null
        },
        province: {
            type: String,
            required: false,
            default: null
        },
        country: {
            type: String,
            required: true,
            default: null
        },
        postalCode: {
            type: String,
            required: true,
            default: null
        }
    },
    phone: {
        type: String,
        required: false,
        default: null
    },
})

marketModel.statics.add = async function(adminName, adminEmail, marketName, marketAddress, mailingAddress, phone) {
    if (!adminName || !adminEmail || !marketName || !marketAddress, !mailingAddress || !phone) {
        throw Error('All fields must be filled')
    }

    const market = await this.create({
        adminName,
        adminEmail,
        marketName,
        marketAddress,
        mailingAddress,
        phone
    })
    return market
}

module.exports = mongoose.model('Market', marketModel)