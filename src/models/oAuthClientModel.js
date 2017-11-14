'use strict'

const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema

const OAuthClientSchema = new Schema({
    clientId: String,
    clientSecret: String,
    redirectUri: String
})

module.exports.OAuthClientSchema = OAuthClientSchema
module.exports.OAuthClient = mongoose.model('OAuthClient', OAuthClientSchema)