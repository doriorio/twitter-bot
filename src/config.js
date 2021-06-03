const path = require('path')
require('dotenv').config({path: '../.env'})

module.exports = {
    twitterKeys: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET

    },

    newsSecret: process.env.NEWS_API
}
