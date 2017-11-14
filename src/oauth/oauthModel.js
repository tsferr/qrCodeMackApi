'use strict'

const
    OAuthToken = require('../models/oAuthTokenModel').OAuthToken,
    OAuthClient = require('../models/oAuthClientModel').OAuthClient,
    UserService = require('../services/userService'),
    UserAccess = require('../models/userAccessesModel').UserAccess,
    User = require('../models/userModel').User,
    request = require('request-promise'),
    _ = require('lodash')

let model = module.exports

model.getClient = (clientId, clientSecret, next) => {

    OAuthClient.findOne({
        clientId: clientId,
        clientSecret: clientSecret
    })
        .then((client) => {
            return next(false, clientId)
        })
        .catch((err) => {
            console.log('invalid client')
        })
}

model.grantTypeAllowed = (clientId, grantType, next) => {

    if (['password'].indexOf(grantType) !== -1) {
        return next(false, true)
    }
}

model.getUser = (username, password, next) => {

    User.findOne({
        username: username,
        isActive: true
    })
        .then(function (user) {
            if (!user)
                return next()

            if (!UserService.validPassword(user.password, password))
                return next()

            return next(null, user._id)

        })
        .catch(function (err) {
            return next(err)
        })
}

model.saveAccessToken = (token, clientId, expires, userId, next) => {
    let accessToken = new OAuthToken({
        accessToken: token,
        clientId: clientId,
        user: userId,
        expires: expires
    })

    let invalidUserClient

    User.findOne({
        _id: userId
    })
        .populate('oauthClients')
        .then((user) => {
            if (!_.some(user.oauthClients, ['clientId', clientId])) {
                throw ('InvalidClient for this user')
            }

            return UserAccess.create({
                user: userId
            })
        })
        .then((userLog) => {
            return accessToken.save()
        })
        .then((accessTokenSuccess) => {
            next(null, accessTokenSuccess)
        })
        .catch((err) => {
            next(err)
        })

}

model.getAccessToken = (bearerToken, next) => {
    OAuthToken.findOne({
        accessToken: bearerToken
    }, next)
}