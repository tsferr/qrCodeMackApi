'use strict'

const
    http = require('http'),
    koa = require('koa'),
    bodyParser = require('koa-body'),
    cors = require('koa-cors'),
    corsError = require('koa-cors-error'),
    gzip = require('koa-gzip'),
    mount = require('koa-mount'),
    db = require('./db'),
    api = require('./src/config/api'),
    oauthServer = require('./src/oauth/oauthServer'),
    koaStatic = require('koa-static')

let server = module.exports = koa();

server.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    headers: ['Content-Type', 'Authorization', 'x-xsrf-token', 'Access-Control-Allow-Origin', 'ignoreToken'],
    credentials: true
}))

server.use(bodyParser())
server.use(corsError)
server.use(gzip())

server.use(koaStatic(__dirname + '/src/staticFiles'))

require('./src/routers/public/index')(server)

server.use(mount('/api', oauthServer.authorise()))

require('./src/middlewares/index')(server)
require('./src/routers/private/index')(server)

db.connection.on('connected', () => {
    http.createServer(server.callback()).listen(api.port, () => {
        console.log('Server listening at http://localhost:' + api.port)
    })
})