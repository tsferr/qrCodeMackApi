'use strict'

const
    mongoose = require('./src/config/mongoose'),
    mongodb = require('./src/config/mongodb')()

module.exports = mongoose.connect(mongodb.connection, mongodb.options, err => {
    if (err)
        throw err
})