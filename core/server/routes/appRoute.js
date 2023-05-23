const {StatusCodes} = require('http-status-codes');
const version = require('../../../version.json')

module.exports = class AppRouter {
    rootPath = '/';

    constructor(){
        this.router = require('express').Router();
    this.registerRoutes()
    }
    getVersionRoute(){
        this.router.get('/version',async(req,res,next)=>{
            try {
                res.status(StatusCodes.OK).send(version)
            } catch (error) {
                res.send(StatusCodes.INTERNAL_SERVER_ERROR)
            }
        })
    }
    
    registerRoutes(){
        this.getVersionRoute()
    }

    async loadRoutes(server){
        await server.use(this.rootPath, this.router)
    }
}