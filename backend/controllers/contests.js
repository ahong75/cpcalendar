const contestRouter = require('express').Router()
const aggregate = require('../services/endpoints.js')

contestRouter.get('/', async (request, response) => {
    const contests = await aggregate()
    response.status(201).json(contests)
}) 

module.exports = contestRouter