const express = require('express')
require('dotenv').config({path: './config/.env'})
const app = express()
const connectDB = require('./config/database')
const productRoutes = require('./routes/products')
const cors = require('cors')

// middleware
app.use(express.json())
app.use(cors())

// quick custom log middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// middleware routes
app.use('/products', productRoutes)

connectDB()
app.listen(process.env.PORT || 4141, () => [
    console.log(`listening on port: ${process.env.PORT || 4141}`)
])