const express = require('express')
const {
    getBacklogs,
    getBacklog,
    addBacklog,
    updateBacklog,
    deleteBacklog
} = require('../controller/backlogController')

const router = express.Router()

router.get("/", getBacklogs)

router.get("/:id", getBacklog)

router.post("/", addBacklog)

router.patch("/:id", updateBacklog)

router.delete("/:id", deleteBacklog)

module.exports = router