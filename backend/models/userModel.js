const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        unique: true,
    },
    address: {
        street: {
            type: String,
            required: false,
            default: null
        },
        apt: {
            type: String,
            required: false,
            default: null
        },
        postalCode: {
            type: String,
            required: false,
            default: null
        },
        province: {
            type: String,
            required: false,
            default: null
        }
    },
    phone: {
        type: Number,
        required: false,
        default: null
    },
    isBuyer: {
        type: Boolean,
        required: true,
        default: false
    },
    isSeller: {
        type: Boolean,
        required: true,
        default: false
    },
    sellerMarketIDs: [{
        type: String
    }]
})

// static signup method
userSchema.statics.signup = async function (email, password, retypePassword, organization, address, phone, isBuyer, isSeller, marketID) {
    // validation
    if (!email || !password || (isSeller && !organization) || (!isBuyer && !isSeller) || (isSeller && !marketID)) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (password !== retypePassword) {
        throw Error('Passwords do not match')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    // check to see if email exists
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error('Email already in use')
    }

    // check to see if organization exists
    const orgExists = await this.findOne({ organization })
    if (orgExists) {
        throw Error('Organization already exists in system')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        email,
        password: hash,
        organization,
        address,
        phone,
        isBuyer,
        isSeller,
        sellerMarketIDs: [marketID]
    })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email and/or password does not match or the account does not exist')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Email and/or password does not match or the account does not exist')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)