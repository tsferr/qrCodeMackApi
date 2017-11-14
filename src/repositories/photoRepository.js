'use strict'

const Photo = require('../models/photoModel').Photo

class PhotoRepository {

    * findOne(query) {
        return yield Photo.findOne(query)
    }

    * find(query) {
        return yield Photo.find(query)
    }

    * create(query) {
        return yield Photo.create(query)
    }

    * update(id, data) {
        return yield Photo.update(id, data)
    }

}

module.exports = new PhotoRepository()