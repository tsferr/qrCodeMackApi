'use strict'

const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    hash: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    insertDate: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Boolean
    },
    oauthClients: [{
        type: Schema.Types.ObjectId,
        ref: 'OAuthClient'
    }]
})

module.exports.UserSchema = UserSchema
module.exports.User = mongoose.model('User', UserSchema)