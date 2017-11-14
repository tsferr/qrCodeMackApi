'use strict'

const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema

const PhotoSchema = new Schema({
    party: {
        type: Schema.Types.ObjectId,
        ref: 'Party'
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    created_user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    isActive: {
        type: Boolean
    }
})

module.exports.PhotoSchema = PhotoSchema
module.exports.Photo = mongoose.model('Photo', PhotoSchema)