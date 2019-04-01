const express = require('express');
var pool = require('./db');

const app = express()
app.set('view engine', 'ejs');
const port = 3000 
// to use css file for styling
app.use(express.static('public'));


app.get('/', function(request, response){


        pool.query('SELECT * FROM evm', function (err, result, fields) {
            console.log(result[0].aani);
            let data = result;
            response.render(`index.ejs`, {data: data} );
            console.log(data);
            if (err) throw new Error(err)
        
            // Do something with result.
        })

});


// listen port, to see page http://localhost:3000/ browser
app.listen(port, () => console.log(`EVM app listening on port ${port}!`));