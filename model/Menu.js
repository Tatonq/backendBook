const mongoose = require('mongoose')

const menus = new mongoose.Schema({
    name: {
        type: String
    },
    detail: {
        type: String
    },
    type: {
        type: String
    }
})

module.exports = mongoose.model('menu', menus)