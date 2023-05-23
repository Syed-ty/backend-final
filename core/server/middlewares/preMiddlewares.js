const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')

module.exports = class PreMiddlewares {
    load(server){
        server.use(cors())
        server.use(bodyParser.json({limit: '20mb'}))
        

    }
}