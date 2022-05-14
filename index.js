const express = require('express');
var bodyParser = require('body-parser')
const fs = require('fs');
var data = fs.readFileSync("data.json");
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
    
app.post('/', urlencodedParser, (req, res) => {
    console.log('Got body! -> ', req.body);
    if(Object.keys(req.body).length !== 0){ 
      console.log('somthing');
      fs.readFile('data.json', function (err, data) {
        var json = JSON.parse(data);
        json.Submissions.push(req.body);    
        fs.writeFile("data.json", JSON.stringify(json), function(err){
          if (err) throw err;
        });
      });
    } else {
      console.log('._. Nothing received');
    }
});
    
app.listen(3000);
