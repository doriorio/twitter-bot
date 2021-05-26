const config = require('./config')
const Twit = require('twit')
const fetch = require('node-fetch')
const _ = require('lodash');

const T = new Twit(config.twitterKeys)

var loopNews = (res) => {
    var cliffNotes = {};
    var counter = 1;
    for (const [key, value] in Object.entries(res.articles)) {
        var current = res.articles[value];
        cliffNotes[counter] = _.pick(current, ['description', 'url', 'title']) ;
        counter++;
    }
    var copy = _.omitBy(cliffNotes, (v) => _.isUndefined(v) || _.isNull(v) || v === '');
    return copy;
    
}
var getNews = () => {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=' + config.newsSecret;
    fetch(url, {method: 'GET'})
    .then(res => res.json())
    .then(json => loopNews(json))

}

getNews();

var tweeter = (articles) => {

}

// res.articles (see loopNews) logs this
// [ { source: { id: 'cnn', name: 'CNN' },
//     author: 'Andy Rose and Leah Asmelash, CNN',
//     title:
//      'Colt Brennan, former star quarterback at the University of Hawaii, dies at 37 - CNN ',
//     description:
//      'Former standout college quarterback Colt Brennan died this week in a California hospital, his family confirmed to CNN.',
//     url:
//      'https://www.cnn.com/2021/05/11/us/colt-brennan-car-accident-death-trnd/index.html',
//     urlToImage:
//      'https://cdn.cnn.com/cnnnext/dam/assets/210511154951-01-colt-brennan-obit-restricted-super-tease.jpg',
//     publishedAt: '2021-05-12T02:04:00Z',
//     content: null },
//   { source: { id: null, name: 'New York Post' },
//     author: 'Juliegrace Brufke',
//     title:
//      'Defiant Liz Cheney lays out her case ahead of vote to oust her from GOP leadership - New York Post ',
//     description:
//      'Liz Cheney (R-Wyo.) took to the House floor to defend her stance on former President Trump on the eve of the House GOP’s conference vote to oust her from her leadership position.',
//     url:
//      'https://nypost.com/2021/05/11/liz-cheney-makes-case-ahead-of-vote-to-oust-her-from-gop-leadership/',
//     urlToImage:
//      'https://nypost.com/wp-content/uploads/sites/2/2021/05/liz-cheney-160.jpg?quality=90&strip=all&w=1200',
//     publishedAt: '2021-05-12T01:33:00Z',
//     content:
//      'House Republican Conference Chair Liz Cheney (R-Wyo.) took to the House floor to defend her stance on former President Trump on the eve of the House GOPs conference vote to oust her from her leadersh… [+3661 chars]' },
//   { source: { id: 'cnn', name: 'CNN' },
//     author: 'Steve Almasy, Raja Razek and Ashley Killough, CNN',
//     title:
//      'Colorado Springs shooter was upset that he wasn\'t invited to the family gathering where he killed six people, police chief says - CNN ',
//     description:
//      'The man who fatally shot six people at a birthday party in Colorado Springs was upset at not being invited to the event, authorities said at a news conference Tuesday afternoon.',
//     url:
//      'https://www.cnn.com/2021/05/11/us/colorado-springs-shooting/index.html',
//     urlToImage:
//      'https://cdn.cnn.com/cnnnext/dam/assets/210509153543-colorado-springs-shooting-super-tease.jpg',
//     publishedAt: '2021-05-12T00:07:00Z',
//     content: null },
//   { source: { id: 'nfl-news', name: 'NFL News' },
//     author: null,
//     title:
//      'Jaguars HC Urban Meyer convinced by \'competitive maniac\' Tim Tebow\'s workouts to give \'it a shot\' - NFL.com',
//     description:
//      'Tim Tebow is expected to be signed by the Jaguars as a tight end and though it\'s not official yet, Jacksonville head coach Urban Meyer said it was Tebow\'s',
//     url:
//      'https://www.nfl.com/news/jaguars-hc-urban-meyer-convinced-by-competitive-maniac-tim-tebow-s-workouts-to-g',
//     urlToImage:
//      'https://static.www.nfl.com/image/private/t_editorial_landscape_12_desktop/league/heiibgdxp79gzgiybhit',
//     publishedAt: '2021-05-11T23:47:00Z',
//     content:
//      'It\'s been more than eight years since Tim Tebow last took an NFL snap, but he can still cause a stir or a mania, if you will, like few can.\r\nJust prior to the kickoff of the 2021 NFL Draft, Tebowmani… [+1752 chars]' },
//   { source: { id: null, name: 'Variety' },
//     author: 'Gene Maddaus',
//     title:
//      'Golden Globes Controversy: HFPA Members Reeling After NBC Pulls the Plug - Variety',
//     description:
//      'The future of the Hollywood Foreign Press Association has been in question for months, ever since the Los Angeles Times exposed its loose financial practices and lack of diversity. But with NBC’s announcement on Monday that it would not broadcast the Golden G…',
//     url:
//      'https://variety.com/2021/film/news/golden-globes-hfpa-members-racism-1234970298/',
//     urlToImage:
//      'https://variety.com/wp-content/uploads/2021/05/Golden-Globes-Placeholder-5.jpg?w=1000',
//     publishedAt: '2021-05-11T23:46:00Z',
//     content:
//      'The future of the Hollywood Foreign Press Association has been in question for months, ever since the Los Angeles Times exposed its loose financial practices and lack of diversity. But with NBC’s ann… [+9027 chars]' },
//   { source: { id: 'cbs-news', name: 'CBS News' },
//     author: 'Zoe Christen Jones',
//     title:
//      'Bob Baffert says Kentucky Derby winner Medina Spirit was treated with ointment that contains steroid - CBS News',
//     description:
//      'If Medina Spirit fails a second drug test, the horse will be stripped of its title.',
//     url:
//      'https://www.cbsnews.com/news/bob-baffert-medina-spirit-kentucky-derby-steroid-ointment/',
//     urlToImage:
//      'https://cbsnews1.cbsistatic.com/hub/i/r/2021/05/11/b64cccb3-7660-4a31-94a2-ff294db3ef01/thumbnail/1200x630/e71a8bdd15cfaac202f5a11e496e6209/gettyimages-1232657741.jpg',
//     publishedAt: '2021-05-11T23:19:52Z',
//     content:
//      'Trainer Bob Baffert on Tuesday acknowledged his horse Medina Spirit was treated with an ointment containing a steroid in the days leading up to the Kentucky Derby. The statement comes after racing of… [+2036 chars]' },
//   { source: { id: 'google-news', name: 'Google News' },
//     author: null,
//     title:
//      'Erica Hernandez\'s family heading to Pearland where police believe a body is in a submerged vehicle - KHOU 11',
//     description: null,
//     url:
//      'https://news.google.com/__i/rss/rd/articles/CBMiK2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9eE9uc1gzQTBYTlXSAQA?oc=5',
//     urlToImage: null,
//     publishedAt: '2021-05-11T23:11:32Z',
//     content: null },
//   { source: { id: null, name: 'AZCentral' },
//     author: 'Stephanie Innes',
//     title:
//      'State drops COVID-19 vaccine freeway message that Arizona senator likens to communism - The Arizona Republic',
//     description:
//      'Arizona removed a COVID-19 vaccine freeway message a senator likened to communism, but officials say the state will continue encouraging vaccines.',
//     url:
//      'https://www.azcentral.com/story/news/politics/arizona/2021/05/11/arizona-drops-adot-covid-19-message-kelly-townsend-likened-communism/5041631001/',
//     urlToImage:
//      'https://www.gannett-cdn.com/presto/2020/09/21/PPHX/9947f940-ca20-4a9b-8a94-8ddf7313d36b-aeae1574-179b-4749-a277-d54cdd41a6f2.jpeg?crop=3887,2187,x0,y197&width=3200&height=1680&fit=bounds',
//     publishedAt: '2021-05-11T22:58:42Z',
//     content:
//      'Sen. Kelly Townsend tweeted a photo of a digital billboard from the Arizona Department of Transportation that says "Want to return to normal? Get vaccinated," and said it was a message that might be … [+5568 chars]' },
//   { source: { id: null, name: 'Space.com' },
//     author: 'Mike Wall',
//     title:
//      'NASA\'s James Webb Space Telescope unfolds its giant mirror for last time ahead of Oct. 31 launch - Space.com',
//     description: '',
//     url:
//      'https://www.space.com/james-webb-space-telescope-final-mirror-test',
//     urlToImage:
//      'https://cdn.mos.cms.futurecdn.net/MmJVrQaFcyyoKkGGbrtbxS-1200-80.jpg',
//     publishedAt: '2021-05-11T22:55:39Z',
//     content:
//      'NASA\'s James Webb Space Telescope has unfurled its big golden mirror for the final time on Earth ahead of its planned launch later this year.\r\nThe $9.8 billion Webb, which is billed as the successor … [+3382 chars]' },
//   { source: { id: 'fox-news', name: 'Fox News' },
//     author: 'Julius Young',
//     title:
//      'Alex Rodriguez seemingly shades Ben Affleck as actor reunites with Jennifer Lopez - Fox News',
//     description:
//      'When asked how he felt about Jennnifer Lopez moving on with Ben Affleck -- a passionate Boston Red Sox fan -- Alex Rodriguez simply replied, “Go Yankees."',
//     url:
//      'https://www.foxnews.com/entertainment/alex-rodriguez-shades-ben-affleck-jennifer-lopez-reunion',
//     urlToImage:
//      'https://static.foxnews.com/foxnews.com/content/uploads/2021/05/Arod-JLo-Afflek.jpg',
//     publishedAt: '2021-05-11T22:50:45Z',
//     content:
//      'Alex Rodriguez is seemingly throwing shade at his ex-fiancée Jennifer Lopez and her recent reunion with former fiancé Ben Affleck.\r\nThe former big-league slugger, 45, poked the "Argo" actor, 48, in t… [+3636 chars]' },
//   { source: { id: 'fox-news', name: 'Fox News' },
//     author: 'Bradford Betz',
//     title:
//      'Andrew Brown Jr.’s family reacts after viewing bodycam video showing deadly police encounter - Fox News',
//     description:
//      'The family of a Black man who was fatally shot by sheriff\'s deputies in North Carolina last month said he did not deserve to die and posed no threat to the officers who shot him.',
//     url:
//      'https://www.foxnews.com/us/andrew-brown-family-jr-bodycam-video-deadly-encounter-police',
//     urlToImage:
//      'https://static.foxnews.com/foxnews.com/content/uploads/2021/05/Al-Sharpton-Andrew-Brown.png',
//     publishedAt: '2021-05-11T22:36:36Z',
//     content:
//      'The family of a Black man who was fatally shot by sheriff\'s deputies in North Carolina last month said he did not deserve to die and posed no threat to the officers who shot him. \r\nThe comments came … [+2645 chars]' },
//   { source: { id: null, name: 'Investor\'s Business Daily' },
//     author: 'Investor\'s Business Daily',
//     title:
//      'Dow Jones Futures Fall After Market Rally Whipsaws On Inflation Fears; Tesla, Apple Lead 8 Stocks At Key Levels - Investor\'s Business Daily',
//     description:
//      'Stocks rallied off lows but finished down Tuesday. The CPI is on tap amid rising inflation fears.',
//     url:
//      'https://www.investors.com/market-trend/stock-market-today/dow-jones-futures-stock-market-rally-ahead-of-key-inflation-data-tesla-apple-facebook-in-focus/',
//     urlToImage:
//      'https://www.investors.com/wp-content/uploads/2016/04/SSA-040816-shutterstock.jpg',
//     publishedAt: '2021-05-11T22:20:00Z',
//     content:
//      'Dow Jones futures edged lower late Tuesday, along with S&amp;P 500 futures and Nasdaq futures. The stock market rally had a wild session Tuesday, closing lower but off intraday lows. Inflation fears … [+11165 chars]' },
//   { source: { id: 'engadget', name: 'Engadget' },
//     author: 'https://www.engadget.com/about/editors/igor-bonifacic',
//     title:
//      'Smart home networking standard Project CHIP rebrands as \'Matter\' - Engadget',
//     description:
//      'Open smart home standard Project Connected Home over IP (CHIP) is now known as Matter..',
//     url:
//      'https://www.engadget.com/chip-rebrand-matter-221410229.html',
//     urlToImage:
//      'https://s.yimg.com/os/creatr-uploaded-images/2021-05/444f8b60-b29f-11eb-9fab-b0fcd102559f',
//     publishedAt: '2021-05-11T22:14:51Z',
//     content:
//      'Project Connected Home over IP (Project CHIP) is now known as Matter. The Connectivity Standards Alliance, an organization made up of more than a hundred device manufacturers, including giants like A… [+1589 chars]' },
//   { source: { id: 'nbc-news', name: 'NBC News' },
//     author: 'The Associated Press',
//     title:
//      'California Gov. Gavin Newsom proposes $12 billion to house state\'s homeless - NBC News',
//     description:
//      'Gavin Newsom on Tuesday proposed $12 billion in new funding to get more people experiencing homelessness in the state into housing and to“ functionally end family homelessness” within five years. Newsom\'s proposal includes $8.75 billion to expand a California…',
//     url:
//      'https://www.nbcnews.com/news/us-news/california-gov-gavin-newsom-proposes-12-billion-house-state-s-n1267037',
//     urlToImage:
//      'https://media3.s-nbcnews.com/j/newscms/2021_19/3472100/210511-los-angeles-homeless-skid-row-ac-556p_79d14ad0f87b3fe4ffb975209d3966ab.nbcnews-fp-1200-630.jpg',
//     publishedAt: '2021-05-11T22:14:36Z',
//     content:
//      'SAN FRANCISCO California Gov. Gavin Newsom on Tuesday proposed $12 billion in new funding to get more people experiencing homelessness in the state into housing and to functionally end family homeles… [+3851 chars]' },
//   { source: { id: null, name: 'Whitehouse.gov' },
//     author: null,
//     title:
//      'FACT SHEET: The Biden-Harris Administration Has Launched an All-of-Government Effort to Address Colonial Pipeline Incident - Whitehouse.gov',
//     description:
//      'Action Update: May 11, 2021, 6:00 PM EDT The recent cyberattack targeting the Colonial Pipeline has triggered a comprehensive federal response focused on',
//     url:
//      'https://www.whitehouse.gov/briefing-room/statements-releases/2021/05/11/fact-sheet-the-biden-harris-administration-has-launched-an-all-of-government-effort-to-address-colonial-pipeline-incident/',
//     urlToImage:
//      'https://www.whitehouse.gov/wp-content/uploads/2021/01/wh_social-share-1100x740.png',
//     publishedAt: '2021-05-11T22:05:43Z',
//     content:
//      'Action Update: May 11, 2021, 6:00 PM EDT\r\nThe recent cyberattack targeting the Colonial Pipeline has triggered a comprehensive federal response focused on securing critical energy supply chains. Pres… [+7904 chars]' },
//   { source: { id: 'fox-news', name: 'Fox News' },
//     author: 'Fox News Staff',
//     title:
//      'Hamas ‘testing Biden’ because they don’t believe he’ll back Israel: Nikki Haley - Fox News',
//     description:
//      'As tensions rise between Israel and Gaza, former U.S. Ambassador to the United Nations Nikki Haley told "The Faulkner Focus" on Tuesday that Hamas is "testing" the Biden administration because they don’t believe he’ll back Israel.',
//     url:
//      'https://www.foxnews.com/media/hamas-testing-biden-because-they-dont-believe-hell-back-israel-nikki-haley',
//     urlToImage:
//      'https://static.foxnews.com/foxnews.com/content/uploads/2019/11/Gaza-Rocket-2.jpg',
//     publishedAt: '2021-05-11T21:56:18Z',
//     content:
//      'As tensions rise between Israel and Palestine, former U.S. Ambassador to the United Nations Nikki Haley told "The Faulkner Focus" on Tuesday that Hamas is "testing" the Biden administration because t… [+1176 chars]' },
//   { source: { id: 'ars-technica', name: 'Ars Technica' },
//     author: 'Beth Mole',
//     title:
//      'Rare, flesh-eating “black fungus” rides COVID’s coattails in India - Ars Technica',
//     description:
//      'People with diabetes are particularly vulnerable to the aggressive fungus.',
//     url:
//      'https://arstechnica.com/science/2021/05/rare-flesh-eating-black-fungus-rides-covids-coattails-in-india/',
//     urlToImage:
//      'https://cdn.arstechnica.net/wp-content/uploads/2021/05/GettyImages-1232556401-760x380.jpeg',
//     publishedAt: '2021-05-11T21:40:13Z',
//     content:
//      'Enlarge/ A health worker exits an ambulance outside a quarantine center in the Goregaon suburb of Mumbai, India, on Tuesday, April 27, 2021. \r\n33 with 22 posters participating\r\nView more stories\r\nAs … [+4213 chars]' },
//   { source: { id: 'fox-news', name: 'Fox News' },
//     author: 'Kayla Rivas',
//     title:
//      'Pfizer, Moderna COVID-19 vaccines likely effective against Indian coronavirus variant, researchers suggest - Fox News',
//     description:
//      'Coronavirus vaccines developed by Pfizer and Moderna appeared to remain effective against a subtype of the Indian virus variant, according to early findings presented Tuesday from researchers at Emory University.',
//     url:
//      'https://www.foxnews.com/health/pfizer-moderna-covid-19-vaccines-indian-coronavirus-variant-emory',
//     urlToImage:
//      'https://static.foxnews.com/foxnews.com/content/uploads/2021/03/ISTOCK_vaccination.jpg',
//     publishedAt: '2021-05-11T21:33:05Z',
//     content:
//      'Coronavirus vaccines developed by Pfizer and Moderna appeared to remain effective against a subtype of the Indian virus variant, according to early findings presented Tuesday from researchers at Emor… [+3068 chars]' },
//   { source: { id: 'nbc-news', name: 'NBC News' },
//     author: 'Dareh Gregorian',
//     title:
//      'NRA bankruptcy filing blocked by Texas judge, forcing group to face New York AG\'s lawsuit - NBC News',
//     description:
//      'A federal judge in Texas denied the NRA\'s bid to declare bankruptcy, finding the petition was not "filed in good faith."',
//     url:
//      'https://www.nbcnews.com/politics/politics-news/nra-bankruptcy-filing-blocked-texas-judge-forcing-group-face-new-n1267035',
//     urlToImage:
//      'https://media4.s-nbcnews.com/j/newscms/2021_19/3472077/210511-wayne-lapierre-jm-1608_d1b4695aa5c7072b3693870a39d9fa7f.nbcnews-fp-1200-630.jpg',
//     publishedAt: '2021-05-11T21:31:00Z',
//     content:
//      'A federal judge in Dallas on Tuesday dismissed the National Rifle Association\'s bid to declare bankruptcy and reorganize in Texas, finding the petition was aimed at gaining an "unfair litigation adva… [+4140 chars]' },
//   { source: { id: null, name: 'Pitchfork' },
//     author: 'Noah Yoo',
//     title:
//      'BRIT Awards 2021 Winners: HAIM, Dua Lipa, Billie Eilish, the Weeknd, and More - Pitchfork',
//     description:
//      'J Hus, Arlo Parks, Harry Styles, and others also took home awards at London’s O2 Arena',
//     url:
//      'https://pitchfork.com/news/brit-awards-2021-winners-haim-dua-lipa-billie-eilish-the-weeknd-and-more/',
//     urlToImage:
//      'https://media.pitchfork.com/photos/609ae57c02e324184f53f60f/16:9/w_1280,c_limit/Dua-Lipa.jpg',
//     publishedAt: '2021-05-11T21:28:01Z',
//     content:
//      'The 2021 Brit Awards were held tonight (May 8) at the O2 Arena in London. Jack Whitehall returned to host the in-person event, which was delayed from its annual February date due to COVID-19 and feat… [+732 chars]' } ]