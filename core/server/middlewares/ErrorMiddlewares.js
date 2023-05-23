const {StatusCodes} = require('http-status-codes');

module.exports = class ErrorMiddlewares {
    load(server){
        server.use((req,res,next)=>{
            res.status(StatusCodes.NOT_FOUND)
        })
    }
}