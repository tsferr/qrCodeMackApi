'use strict'

const oauthserver = require('koa-oauth-server')

let oauthServer = oauthserver({
    model: require('./oauthModel'),
    grants: ['password'],
    debug: false,
    accessTokenLifetime: 604800, //7 days
    refreshTokenLifetime: 604800, //7 days
})

module.exports = oauthServer