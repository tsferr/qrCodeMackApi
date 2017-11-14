'use strict'

let 
    port = process.env.MONGO_PORT || 27017,
    connection = process.env.MONGO_HOST || "mongodb://localhost:" + port + "/qrcode_local"

const options = {
    server: {
        poolSize: 5,
        socketOptions: {
            keepAlive: 1
        }
    }
}

module.exports = () => ({
    connection,
    options
})