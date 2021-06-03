const config = require('./config')
const Twit = require('twit')
const fetch = require('node-fetch')
const _ = require('lodash');

const T = new Twit(config.twitterKeys);

var loopNews = (res) => {
    var cliffNotes = {};
    var counter = 1;
    for (const [key, value] in Object.entries(res.articles)) {
        var current = res.articles[value];
        if (current) {
            cliffNotes[counter] = _.pick(current, ['description', 'url', 'title']) ;
            counter++;
        }
    }
    var copy = _.flatten(cliffNotes);
    
    tweeter(cliffNotes);
    
}
var getNews = () => {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=' + config.newsSecret;
    fetch(url, {method: 'GET'})
    .then(res => res.json())
    .then(json => loopNews(json))

}

getNews();



var tweeter = (articles) => {
    var composeTweet = function(tweet){
        var checkLen = function(str, add){
            if (str.length < 280 && (add.length + str.length  < 280 )) {
                return str + add;
            } else {
                return str.substring(0, 280);
            }
        }; 
        var _ = '';
        _+=tweet.title + ' | ';
        _ = checkLen(_,(tweet.description + ' '));

        _= checkLen(_,('read more @ ' + tweet.url));
        // console.log(_)
        return _;
    }
    // console.log(articles);
    var current = '';
    Object.keys(articles).forEach(function(item) {
        var current = composeTweet(articles[item])
        
        T.post('statuses/update', {'status': current}, function(err, data, response){
            console.log(err)
            console.log(data)
            console.log(response)
        })
        
       console.log(current);
    }); 
}

var Tweeter = {
    
}

//shape
// [ '1',
//   { description:
//      'In the wake of changes in the Celtics front office, Kevin O’Connor suggests Danny Ainge might by open to an Oregon return.',
//     url:
//      'https://www.blazersedge.com/2021/6/2/22465899/danny-ainge-boston-celtics-news-portland-trail-blazers-transactions',
//     title:
//      'O’Connor: Danny Ainge Might Have Interest in Blazers - Blazer\'s Edge' } ]