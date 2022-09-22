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

// create admin
adminSchema.statics.signup = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strog enough')
    }

    // check to see if email exists
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    const admin = await this.create({
        email,
        password: hash
    })

    return admin
}

module.exports = mongoose.model('Admin', adminSchema)