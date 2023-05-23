var path = require('path');
const BaseApp = require('./core/BaseApp');
const appConfig = require('./src/config/appConfig');
global.appRoot = path.resolve(__dirname);

const app =  new BaseApp(appConfig);
app.bootstrap(process.env.APP_PORT || 8002).then(()=>{
    console.log('App started on',process.env.APP_PORT)
})
