// modules
const express = require('express')
const request = require('request');
const bodyParser = require('body-parser');

const app = express()
// to see .ejs 
app.set('view engine', 'ejs');
// define port
const port = 3000 
// bodyparser to get input from index for search
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// render index with empty object
app.get('/', (request, response) =>  response.render(`${__dirname}/index.ejs`, {data: false} ));
// to use css file for styling
app.use(express.static('public'))
// listen port
app.listen(port, () => console.log(`Reddit app listening on port ${port}!`))
// request url searchword to get json
app.post('/', function (req, res) {
  let searchTerm = req.body.searchField;
  let url = `https://www.reddit.com/search.json?q=${searchTerm}`;
  // get JSON from reddit
  request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
        // get data and send it to ejs
        let data = JSON.parse(body);
        res.render(`${__dirname}/index.ejs`, {data: data} );
    }
});
});
