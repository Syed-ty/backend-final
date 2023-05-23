require('dotenv').config()
const express = require('express')
const app = express()
const SecurityMiddlewares = require('../../core/server/middlewares/securityMiddlewares')
const PreMiddlewares = require('../../core/server/middlewares/preMiddlewares');
const PostMiddlewares = require('../server/middlewares/postMiddlewares')
const ErrorMiddlewares = require('../server/middlewares/ErrorMiddlewares')


module.exports = class Server {
    constructor(appConfig) {
        console.log('server Created')
        this.config = appConfig;
        this.server = express();
    }
    async bootstrap(port){
        this.loadSecurityMiddlewares();
        this.loadPostMiddlewares();
        this.loadPreMiddlewares();
        this.loadRouters();
        this.loadErrorMiddlewares();
      await this.startServer(port) 

    }
    loadSecurityMiddlewares(){
        const securityMiddlewares = new SecurityMiddlewares();
        securityMiddlewares.load(this.server)
    }

    loadPreMiddlewares(){
        const preMiddlewares = new PreMiddlewares();
       preMiddlewares.load(this.server)
    }

    loadRouters(){
      this.loadBaseRouters() 
      this.loadAppRouters()
        }
        
        loadBaseRouters() {
            const baseRouterPath = './routes/';
            const normalizationPath = require('path').join(__dirname, baseRouterPath);
            require('fs').readdirSync(normalizationPath).forEach((file)=>{
             const ModuleClass = require(`${baseRouterPath}${file}`); 
             const moduleRouterInstance = new ModuleClass();
             moduleRouterInstance.loadRoutes(this.server);    
        });
    }

        loadAppRouters() {
            const normalizedPath = require('path').join(__dirname, this.config.routers);
            require('fs').readdirSync (normalizedPath).forEach((file) => {
            const ModuleClass = require(`${this.config.routers}${file}`); 
            const moduleRouterInstance = new ModuleClass();   
            moduleRouterInstance.loadRoutes (this.server);
            })
        }
      
        loadPostMiddlewares(){
            const postMiddlewares = new PostMiddlewares();
            postMiddlewares.load(this.server)
        }

        loadErrorMiddlewares(){
            const errorMiddlewares = new ErrorMiddlewares();
            errorMiddlewares.load(this.server)
        }




    async startServer(port){
        await this.server.listen(process.env.APP_PORT || port);
        console.log("Server started at port",process.env.APP_PORT || 8002)
    }
}