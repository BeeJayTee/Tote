const express = require('express')
require('dotenv').config({path: './config/.env'})
const app = express()
const connectDB = require('./config/database')

// middleware
app.use(express.json())

// quick custom log middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// middleware routes


connectDB()
app.listen(process.env.PORT || 4141, () => [
    console.log(`listening on port: ${process.env.PORT || 4141}`)
])