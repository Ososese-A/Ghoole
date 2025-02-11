const path = require('path')
const fs = require('fs').promises

const Stocks = require('../models/stockModel')

const mongoose = require('mongoose')
const { json } = require('express')

//finding all the stocks from the database
//sending the stocks once the response is ok (200)
const getStocks = async (req, res) => {
    const stocks = await Stocks.find({}).sort({createdAt: -1})

    res.status(200).json(stocks)
}

//get the id from the request parameter by way of destructuring 
//check if it is a valid mongoDB id using mongoose
//find the stock from the database using the id
//check if the stock was found or not 
//if the response is ok (200) pass the stock as a json
const getStock = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `You don't have this stock saved`})
    }

    const stock = await Stocks.findById(id)

    if (!stock) {
        return res.status(404).json({error: `You don't have this stock saved`})
    }

    res.status(200).json(stock)
}

const getSample = async (req, res) => {
    filePath = path.join(__dirname, '..' ,'stockData.json')
    fileContent = await fs.readFile(filePath)
    jsonData = JSON.parse(fileContent)
    return res.status(200).json(jsonData)
}

//get the stock symbol from the request body by way of destructuring 
//using an empyFields array, if statements to push text into the arrays and if statements to show error on status 400 when the array length is > 0
//try to create a stock to the model passing the symbol and then respond ok (200) and pass the stock as json
//catch and respond with the error
// const addStock = async (req, res) => {
//     const {symb} = req.body

//     let emptyFields = []

//     if (!symb) {
//         emptyFields.push('symb')
//     }

//     if (emptyFields.length > 0) {
//         res.status(400).json({error: 'Please fill in all the empty fields', emptyFields})
//     }

//     try {
//         const stock = await Stocks.create({symb})
//         res.status(200).json({stock})
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }
const addStock = async (req, res) => {
    const {symb, stockName, sector, industry} = req.body
    console.log(symb)
    console.log(stockName)

    // let emptyFields = []

    // if (!symb) {
    //     console.log(symb)
    //     emptyFields.push('symb')
    // }

    // if (emptyFields.length > 0) {
    //     res.status(400).json({error: 'Please fill in all the empty fields', emptyFields})
    // }

    try {
        const stock = await Stocks.create({symb, stockName, sector, industry})
        res.status(200).json({stock})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get id from the request parameter 
//check if the id is a valid mongoDB id
//with the stock variable await, findOneAndDelete from the DB using the id
//if we could not find the id (404) respond with an error 
//send the stock on response 200 
const deleteStock = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: `Stock not found`})
    }

    const stock = await Stocks.findOneAndDelete({_id: id})

    if (!stock) {
        res.status(404).json({error: `Stock not found`})
    }

    res.status(200).json(stock)
}


module.exports = {
    getStocks,
    getSample,
    getStock,
    addStock,
    deleteStock
}