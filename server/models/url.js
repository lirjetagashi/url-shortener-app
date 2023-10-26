const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    original: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Url', urlSchema)