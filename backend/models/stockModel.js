const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockSchema = new Schema({
        symb: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    })

module.exports = mongoose.model('Stock', stockSchema)