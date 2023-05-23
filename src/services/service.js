const {QueryTypes} = require('sequelize')
const PostgresSequelize = require('../utils/PostgresSequelize')
const commentsModel = require('../models/userModel')


module.exports = class UserService {
    modelName ='user';
    
    constructor() {
        console.log('user Service created');
        commentsModel.initModel(PostgresSequelize);
    };

   

    async addComments(details){
        try {
             await PostgresSequelize.query(`CREATE TABLE IF NOT EXISTS "comments" (
                name varchar(45) NOT NULL,
                comment varchar(450),
                id varchar(450) ,
                CurrentDate varchar(450) 
              )`)
              const addComments = await commentsModel.create(details)
            if(addComments){
                return addComments
            }
        } catch (error) {
            console.log(error)
            
        }
    }

     async getAllData(){
        try {
            const getComment= await commentsModel.findAll()
            return getComment
        } catch (error) {
            console.log(error)
        }
    }

    async updateCommentDetails(reqBody,commentid){
        try {
            reqBody.CurrentDate=new Date()
            const {name,comment,id,CurrentDate}=reqBody
            const updateData = await PostgresSequelize.query(`UPDATE comments set name='${name}',comment='${comment}',CurrentDate='${CurrentDate}' where id='${commentid}' RETURNING * `, { type: QueryTypes.UPDATE })
            return updateData[0]

        } catch (error) {
            console.log(error)
        }
    }

    async sortingDetails(){
        try {
            const getDetails= await commentsModel.findAll({});
            getDetails.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1: -1);
            return getDetails
        } catch (error) {
            console.log(error)
        }
    }
}

