'use strict'

const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema

const PartySchema = new Schema({
    date_start: {
        type: Date,
        required: true
    },
    date_end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    banner:{
        type: String,
        required: true
    },
    photos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Photo',
            required: true
        }
    ]
})

module.exports.PartySchema = PartySchema
module.exports.Party = mongoose.model('Party', PartySchema)