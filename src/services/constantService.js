'use strict'

const 
    co = require('co'),
    OAuthClient = require('../models/oAuthClientModel').OAuthClient

class ConstantService {

    constructor() {
        var that = this

        co(function*() {
            that.oAuthClientSite = yield OAuthClient.findOne({
                clientId: 'site'
            }).lean()

        })
    }

}

module.exports = new ConstantService()