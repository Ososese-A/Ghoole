const express = require('express')
const {
    getStocks,
    getStock,
    addStock,
    deleteStock } = require('../controller/stockController')

const router = express.Router()

router.get('/', getStocks)

router.get('/:id', getStock) 

router.post('/', addStock)

router.delete('/:id', deleteStock)

module.exports = router