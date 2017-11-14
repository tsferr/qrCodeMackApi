'use strict'

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    PhotoService = require('../../services/photoService')

let photoRouter = new Router()

photoRouter.get('/me', function* (next){
    try {

        let photos = yield PhotoService.getPhotos(this.user)

        this.body = photos
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

photoRouter.get('/:id', function* (next){
    try {

        let photo = yield PhotoService.getPhoto(this.params.id)

        this.body = photo
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

photoRouter.post('/', function* (next){
    try {

        let photo = yield PhotoService.create(this.request.body)
        
        this.body = photo
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

photoRouter.put('/:id', function* (next){
    try {

        let photo = yield PhotoService.update(this.params.id, this.request.body)
        
        this.body = photo
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

photoRouter.del('/:id', function* (next){
    try {

        let photo = yield PhotoService.delete(this.params.id)
        
        this.body = photo
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

module.exports = photoRouter