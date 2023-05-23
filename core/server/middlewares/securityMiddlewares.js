const helmet = require('helmet')

module.exports = class SecurityMiddlewares {
    load(servers) {
        servers.use(helmet())
    }
    
}