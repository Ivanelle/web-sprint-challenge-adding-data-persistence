// build your `/api/resources` router here

const express = require('express')
const router =  express.Router()
const Resource = require('./model')

const {
    validateResource,
} = require('./middleware')

router.get('/', (req, res, next) => {
    Resource.getAllResources()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(next)
})

router.post('/', 
    validateResource, 
    async (req, res, next) => {
        const { resource_name, resource_description } = req.body
        try {
            const newResource = await Resource.addResource({
                resource_name,
                resource_description
            })
            res.status(201).json(newResource)

        } catch(err) {
            next(err)
        }
        
}) 

router.use((err, req, res, next) => {
    res.status(500).json({
        custMsg: 'something went wrong inside resource router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router