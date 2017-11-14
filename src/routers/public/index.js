'use strict'

const mount = require('koa-mount')

module.exports = function(server) {

    const signUpRouter = require('./signUpRouter')
    server.use(mount('/api', signUpRouter.routes()))

    const checkEmailRouter = require('./checkEmailRouter')
    server.use(mount('/api', checkEmailRouter.routes()))

    const oauthRouter = require('./oauthRouter')
    server.use(oauthRouter.routes())

}