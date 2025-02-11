const express = require('express')
const {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    deletePortfolio,
    updatePortfolio,
    deletePortfolioProfile
} = require('../controller/portfolioController')

const router = express.Router()

router.get('/', getPortfolios)

router.get('/:id', getPortfolio)

router.post('/', createPortfolio)

router.delete('/:id', deletePortfolio)

router.patch('/:id', updatePortfolio)

router.patch('/deleteProfile/:id', deletePortfolioProfile)

module.exports = router