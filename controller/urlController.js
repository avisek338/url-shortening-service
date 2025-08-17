const urlValidator = require('../validation.js/validateURL')
const URL = require('../models/url.model')
const { StatusCodes } = require('http-status-codes')
const ServiceManager = require('../services/service-manager')

// Initialize ServiceManager
const serviceManager = new ServiceManager();
const base62EncodingService = serviceManager.createBase62EncodingService();
const counterService = serviceManager.createCounterService();
const cacheService = serviceManager.createCacheService();

const urlShortner = async (req, res) => {

    const origUrl = req.body.originalUrl
    if (urlValidator(origUrl)) {
        const urlObj = {}
        console.log("Creating short URL...")
        const urlcount = await counterService.getValue('urlCounter')
        const urlid = base62EncodingService.encode(urlcount)
        urlObj.urlId = urlid
        urlObj.origUrl = origUrl
        urlObj.shortUrl = `${process.env.BASE_URL}/${urlid}`
        cacheService.set(urlid, origUrl)
        try {
            const response = await URL.create(urlObj)
            res.status(StatusCodes.CREATED).json({ response })
        } catch (e) {
            res.status(500).json({ msg: 'internal server problem' })
        }

    }
    else {
        res.status(404).json({ msg: 'enter valid url' })
    }

}

const getFromShortUrl = async (req, res) => {
    try {
        console.log("Retrieving original URL...")
        // Check if the URL is cached
        var isCached = false;
        const cachedUrl = await cacheService.get(req.params.uid)
        if (cachedUrl) {
            isCached = true;
            res.redirect(cachedUrl)
        }

        const response = await URL.findOne({ urlId: req.params.uid })
        if (!response) {
            return res.status(404).json({ msg: "Bad request" })
        }
        const clicks = response.clicks + 1
        await URL.findOneAndUpdate({ _id: response._id }, { clicks })
        if (!isCached) {
            cacheService.set(req.params.uid, response.origUrl)
            res.redirect(response.origUrl)
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'internal server problem' })
    }


}

module.exports = {
    urlShortner,
    getFromShortUrl
}