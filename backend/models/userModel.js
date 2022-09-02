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
        required: false,
        unique: true,
        default: null
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
    isAdmin: {
        type: Boolean
    }
})

// static signup method
userSchema.statics.signup = async function (email, password, organization, address, phone, isBuyer, isSeller) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
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
        isSeller
    })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    const match = await bcrypt.compare(password, user.password)

    if (!user || !match) {
        throw Error('Email and/or password does not match or the account does not exist')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)