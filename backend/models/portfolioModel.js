const mongoose = require('mongoose')
const Schema = mongoose.Schema

const portfolioSchema = new Schema(
    {
        symbol: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Portfolio', portfolioSchema)