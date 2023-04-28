const asyncHandler = require('express-async-handler')

const Pain = require('../models/painModel')
const User = require('../models/userModel')

// @desc Gets pain
// @route GET /api/pain
// @access Private
const getPain = asyncHandler(async (req, res) => {
const pain = await Pain.find({ user: req.user.id })

    res.status(200).json(pain)
})

// @desc Create pain
// @route POST /api/pain
// @access Private
const createPain = asyncHandler(async (req, res) => {
    if(!req.body.type) {
        res.status(400)
        throw new Error('Type selection is required')
    }

    const pain = await Pain.create({
        type: req.body.type,
        severity: req.body.severity,
        date: req.body.date,
        note: req.body.note,
        user: req.user.id,
    })
    
    res.status(200).json(pain)
})

// @desc Update pain
// @route PUT /api/pain/:id
// @access Private
const updatePain = asyncHandler(async (req, res) => {
    const pain = await Pain.findById(req.params.id)

    if(!pain) {
        res.status(400)
        throw new Error('Pain not found')
    }

    const user = await User.findById(req.user.id)

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(pain.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized to perform this action')
    }

    const updatedPain = await Pain.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPain)
})

// @desc Deletes pain
// @route DELETE /api/pain/:id
// @access Private
const deletePain = asyncHandler(async (req, res) => {
    const pain = await Pain.findById(req.params.id)

    if(!pain) {
        res.status(400)
        throw new Error('Pain not found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(pain.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized to perform this action')
    }

    await pain.deleteOne()
        res.status(200).json({ id: req.params.id })
    })

module.exports = {
    getPain,
    createPain,
    updatePain,
    deletePain
}