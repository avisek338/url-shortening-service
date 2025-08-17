const express = require('express')
const router = express.Router()
const {
    urlShortner,
    getFromShortUrl
} = require('../controller/urlController')

router.route('/').post(urlShortner)
router.route('/:uid').get(getFromShortUrl)

module.exports =router