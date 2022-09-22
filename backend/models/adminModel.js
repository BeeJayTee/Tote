const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// static login method
adminSchema.statics.login = async function (email, password) {
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

module.exports = mongoose.model('Admin', adminSchema)