const UserService = require('../../src/services/service')
const {StatusCodes} =  require('http-status-codes')

 module.exports = class UserController {
    constructor(){
        console.log('User controller is created')
        this.userService = new UserService()
    }
 
    async addComments(userDetails){
        const create =  await this.userService.addComments(userDetails)
        if(create){
            return {
                error:null,
                message:'Comment are  added  successfully',
                response:create,
            }
        }else{
            return {
                error:true,
                message:"Something Went Wrong",
                response:[],
                
            } 
        }
    }

    async getAll(){
        try{

        const data = await this.userService.getAllData()
        
        if(data){
            return {
                error:null,
                message:'fetched all data',
                response:data,
                
                
            }
        }else{
            return{
            error:true,
            message:"Something Went Wrong",
            response:[],
            }
        }
    } catch(error) {
        console.log(error)
    }
    }

    async updateComments(userDetails,id){
        const create =  await this.userService.updateCommentDetails(userDetails,id)
        if(create){
            return {
                error:null,
                message:'commentDetails are Updated Successfully',
                response:create,
                
            }
        }else{
            return{
                error:true,
                message:"Something Went Wrong",
                response:[],
                }
            }
            
    }

    async sortingDetails(){
        const sortData =  await this.userService.sortingDetails()
        if(sortData){
            return {
                error:null,
                message:'Successfully Sorted',
                response:sortData,     
                
            }
        }else{
            return{
                error:true,
                message:"Something Went Wrong",
                response:[],
                }
            } 
    }
 }
