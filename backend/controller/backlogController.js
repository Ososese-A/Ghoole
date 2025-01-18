const Backlog = require('../models/backlogModel')

const mongoose = require('mongoose')

const getBacklogs = async (req, res) => {
    const backlogs = await Backlog.find()

    res.status(200).json(backlogs)
}

const getBacklog = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "This backlog does not exist"})
    }

    const backlog = await Backlog.findById(id)

    if (!backlog) {
        return res.status(404).json({error: "This backlog does not exist"})
    }

    res.status(200).json(backlog)
}

const addBacklog = async (req, res) => {
    const {stockBacklog, portfolioBacklog} = req.body

    //empty field checker code

    try {
        const backlog = await Backlog.create({stockBacklog, portfolioBacklog})
        res.status(200).json({backlog})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateBacklog = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'This backlog does not exist'})
    }

    const backlog = await Backlog.findOneAndUpdate(
        {_id: id},
        { ...req.body }
    )

    if (!backlog) {
        return res.status(404).json({error: "This Backlog does not exist"})
    }

    res.status(200).json(backlog)
}

const deleteBacklog = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'This backlog does not exist'})
    }

    const backlog = await Backlog.findOneAndDelete({_id: id})

    if (!backlog) {
        return res.status(404).json({error: 'This Backlog does not exist'})
    }

    res.status(200).json(backlog)
}

module.exports = {
    getBacklogs,
    getBacklog,
    addBacklog,
    updateBacklog,
    deleteBacklog
}