'use strict'

const
    PhotoRepository = require('../repositories/photoRepository'),
    moment = require('moment')

class PhotoService {

    * getPhotos(user) {
        return yield PhotoRepository.find({
            created_user: user._id
        })
    }

    * getPhoto (id) {
        return yield PhotoRepository.findOne({
            _id: id
        })
    }

    * create(body) {
        return yield PhotoRepository.create(body)
    }

    * update(id, body) {
        return yield PhotoRepository.update({
            _id: id
        }, body)
    }

    * delete(id) {
        return yield PhotoRepository.update({
            _id: id
        }, {
            $set: {
                isActive: false
            }
        })
    }

}

module.exports = new PhotoService()