require('dotenv').config();
const server =require('./server/servers');

module.exports = class BaseApp {
    #server = {};

    constructor(appConfig){
        this.config = appConfig;
        this.#server = new server(this.config);
    }

    async bootstrap(){
        await this.#server.bootstrap()
    }
}