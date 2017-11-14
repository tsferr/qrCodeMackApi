'use strict'

const mount = require('koa-mount')

module.exports = function (server) {

    const userRouter = require('./userRouter')
    server.use(mount('/api/user', userRouter.routes()))

    const partyRouter = require('./partyRouter')
    server.use(mount('/api/party', partyRouter.routes()))

    const photoRouter = require('./photoRouter')
    server.use(mount('/api/photo', photoRouter.routes()))
    
}