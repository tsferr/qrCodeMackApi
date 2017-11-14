'use strict';

//Module dependencies
const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    oauthServer = require('../../oauth/oauthServer')

let oauthRouter = new Router()

oauthRouter.post('/oauth/token', oauthServer.grant())

module.exports = oauthRouter