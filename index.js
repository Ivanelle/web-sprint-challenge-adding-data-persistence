// start your server here
const server = require('./api/server.js')

const port = process.env.PORT || 9001

server.listen(port, () => {
    console.log(`API running on Port ${port}`)
})