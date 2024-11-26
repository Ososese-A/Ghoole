require('dotenv').config()
const express = require('express')
const stockRoute = require('./routes/stockRoute')
const portfolioRoute = require('./routes/portfolioRoute')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


app.use('/api/stock/', stockRoute)
app.use('/api/portfolio/', portfolioRoute)


app.get('/', (req, res) => {
    res.send("Hello")
})

mongoose.connect(process.env.MONGO_URI)
    .then(
        () => {
            app.listen(process.env.PORT, () => {
                console.log(`MongoDB connected and we are live at port ${process.env.PORT}`)
            })
        }
    )
    .catch(
        (error) => {
            console.log(error)
        }
    )