'use strict'

const mount = require('koa-mount')

module.exports = function(server) {

    const userMiddleware = require('./userMiddleware')
    server.use(mount('/api', userMiddleware))

}