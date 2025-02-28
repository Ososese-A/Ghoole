const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockSchema = new Schema({
        symb: {
            type: String,
            required: true
        },

        stockName: {
            type: String,
            required: true
        },
        
        portfolio: {
            type: Schema.Types.ObjectId,
        },

        industry: {
            type: String
        },

        sector: {
            type: String
        },
    }, {
        timestamps: true
    })

module.exports = mongoose.model('Stock', stockSchema)