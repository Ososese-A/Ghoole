const express = require('express')
const {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    deletePortfolio,
    updatePortfolio
} = require('../controller/portfolioController')

const router = express.Router()

router.get('/', getPortfolios)

router.get('/:id', getPortfolio)

router.post('/', createPortfolio)

router.delete('/:id', deletePortfolio)

router.patch('/:id', updatePortfolio)

module.exports = router