const UserController = require('../controllers/userController')
const {StatusCodes} = require('http-status-codes')


module.exports = class UserRouter {
    rootPath = '/comment'
    constructor(){

        this.router = require('express').Router()
        console.log('User Routes is created')
         this.userController = new UserController()
        this.registerRoutes()
    }

    addComments(){
        this.router.post('/addcomment', async(req,res,next)=>{
            try {
                req.body.CurrentDate=new Date()
                const details = await this.userController.addComments(req.body)
                if(details){
                    res.status(StatusCodes.OK).send(details)
                } else {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
                }
                
            } catch (error) {
                console.log(error)
            }
        })
    }

    getAllUser(){
        this.router.get('/getalldata', async(req,res,next)=>{
            try {
                const getUserData = await this.userController.getAll(req.query)
                if(getUserData){
                    res.status(StatusCodes.OK).send(getUserData)
                } else {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
                }
                
            } catch (error) {
                console.log(error)
            }
        })
    }
    updateComments(){
        this.router.put('/update/:id', async(req,res,next)=>{
            try {
                const getUserData = await this.userController.updateComments(req.body,req.params.id)
                if(getUserData){
                    res.status(StatusCodes.OK).send(getUserData)
                } else {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
                }     
            } catch (error) {
                console.log(error)
            }
        })
    }

    sortedDetails(){
        this.router.get('/sort', async(req,res,next)=>{
            try {
                const getUserData = await this.userController.sortingDetails()
                if(getUserData){
                    res.status(StatusCodes.OK).send(getUserData)
                } else {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
                }     
            } catch (error) {
                console.log(error)
            }
        })
    }

    registerRoutes(){
        this.getAllUser();
        this.addComments();
        this.updateComments();
        this.sortedDetails();
    }
    async loadRoutes(server){
        await server.use(this.rootPath, this.router)
    }
}