// build your `/api/resources` router here

const router = require('express').Router()
const Resource = require('./model')

router.get('/', (req, res, next) => {
    
})

router.post('/', (req, res, next) => {

})

router.use((err, req, res, next) => {
    res.status(500).json({
        custMsg: 'something went wrong inside resource router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router