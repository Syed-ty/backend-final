const {Sequelize} = require('sequelize');
require('dotenv').config();

class PostgresSequelize {
    constructor(params){
        console.log(`${this.constructor.name} constructor called`)
    }

    connect() {

        try { 
        const sequelize = new Sequelize(
        process.env.PG_DB,
        process.env.PG_USER,
        process.env.PG_PASSWORD,
        {
        
        host: process.env.PG_HOST, 
        dialect: 'postgres', 
        pool: {
        
        max: parseInt(process.env.PG_POOL_MAX || 5, 10),
        min: parseInt(process.env.PG_POOL_MIN | 0, 10), 
        acquire: process.env.PG_ACQUIRE, 
        idle: process.env.PG_IDLE,
        
        }, 
        logging: false,
        
        define: {
        
        freezeTableName:true,
        
        },
        
        dialectOptions: {
        
        useUTC: false, // for reading from database
        
        dateStrings: true,
        
        typeCast(field, next) { // for reading from databa if (field.type === 'DATETIME') {
            if (field.type === 'DATETIME') { 
                return field.string();
            }
            
            return next();
            
            },
        },
            timezone: '+05:30', 
            },   
            );  
            // Add pool release method
            
            process.on('beforeExit', () => { 
            sequelize.close();  
            });  
            return sequelize;
            } catch (error) { 
            console.error('Unable to connect to the database:', error);  
            throw Error('Error while connecting database');
            
            }
        }
    }
        module.exports = new PostgresSequelize().connect();