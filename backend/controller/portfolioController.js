const Portfolio = require('../models/portfolioModel')
const mongoose = require('mongoose')

const getPortfolios = async (req, res) => {
    const portfolios = await Portfolio.find()

    res.status(200).json(portfolios)
}

const getPortfolio = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'This portfolio does not exist'})
    }

    const portfolio = await Portfolio.findById(id)

    if(!portfolio) {
        return res.status(404).json({error: 'This portfolio does not exist'})
    }

    res.status(200).json(portfolio)
}

const createPortfolio = async (req, res) => {
    const {symbol, name} = req.body

    const emptyFields = []

    if(!symbol) {
        emptyFields.push('symbol')
    }

    if(!name) {
        emptyFields.push('name')
    }

    if(emptyFields > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    try {
        const portfolio = await Portfolio.create({symbol, name})
        res.status(200).json({portfolio})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deletePortfolio = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'This Portfolio does not exist'})
    }

    const portfolio = await Portfolio.findOneAndDelete({_id: id})

    if(!portfolio) {
        return res.status(404).json({error: 'This Portfolio does not exist'})
    }

    res.status(200).json(portfolio)
}

//get the id from the request parameter by way of destructuring
//check if the id is valid
//findOneAndUpdate with the id and spreading out the request body
//check if the update was successful
//respond with the update variable
const updatePortfolio = async (req, res) => {
    const {id} = req.params
    const {profile} = req.body
    const profileAsId = new mongoose.Types.ObjectId(profile)

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'This portfolio does not exist'})
    } else {
        if(!mongoose.Types.ObjectId.isValid(profile)) {
            return res.status(404).json({error: 'This stock does not exist'})
        }
    }

    const portfolio = await Portfolio.findOneAndUpdate(
        {_id: id}, 
        // { $push: {profile: profileAsId} },
        { $addToSet: {profile: profileAsId} },
        {new: true}
    )
    
    res.status(201).json(portfolio)
}

const deletePortfolioProfile = async (req, res) => {
    const {id} = req.params
    const {profile} = req.body
    const profileAsId = new mongoose.Types.ObjectId(profile)

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'This portfolio does not exist'})
    } else {
        if(!mongoose.Types.ObjectId.isValid(profile)) {
            return res.status(404).json({error: 'This stock does not exist'})
        }
    }


    const portfolio = await Portfolio.findOneAndUpdate(
        { _id: id },
        { $pull: { profile: profileAsId } },
        { new: true }
    );

    res.status(200).json(portfolio)
}


module.exports = {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    deletePortfolio,
    updatePortfolio,
    deletePortfolioProfile
}