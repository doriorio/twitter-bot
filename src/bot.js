const config = require('./config')
const Twit = require('twit')
const fetch = require('node-fetch')
console.log(config);
const T = new Twit(config.twitterKeys)


var getNews = () => {
    let url = ' https://newsapi.org/v2/top-headlines?country=us&apiKey=' + config.newsSecret;
    fetch(url, {method: 'GET'})
    .then(res => res.json())
    .then(json => console.log(json))

}

getNews();
