const mongoose = require('mongoose')

const Schema = mongoose.Schema

const backlogStockSchema = new Schema (
    {
        symbol: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        priceChange: {
            type: Number,
            required: true
        },

        percentPriceChange: {
            type: Number,
            required: true
        },

        unixTime: {
            type: Number,
            required: true
        },

    }, 

    {
        timestamps: true,
    }
)

const backlogPortfolioSchema = new Schema(
    {
        symbol: {
            type: String,
            required: true
        }, 

        name: {
            type: String, 
            required: true
        },

        price: {
            type: String,
            required: true
        },

        priceChange: {
            type: Number,
            required: true
        },

        percentPriceChange: {
            type: Number,
            required: true
        },

        unixTime: {
            type: Number,
            required: true
        }
    },

    {
        timestamps: true,
    }
)

const backlogSchema = new Schema(
    {
        stockBacklog: {
            type: [backlogStockSchema],
            required: true
        },

        portfolioBacklog: {
            type: [backlogPortfolioSchema],
            required: true
        }
    },

    {
        timestamps: true
    }
)

module.exports = mongoose.model('Backlog', backlogSchema)