var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');

    next();
});

var port = process.env.PORT || 8080;

var configDatabase = require('./config/database.js');
mongoose.connect(configDatabase.url);

var schemaLink = mongoose.Schema({
    username: String,
    title: String,
    url: String,
    date: String
});

var Link = mongoose.model('Link', schemaLink);

app.get('/all', function(request, response) {
    var query = {};
    Link.find(query, function(err, links) {
        if(err) console.log('error');
        else {
            response.send(links);
        }
    }).sort({date: 'descending'});
});

app.post('/save', function(request, response) {
    var data = request.body;
    var link = new Link({
        username: data.username,
        title: data.title,
        url: data.url,
        date: new Date().toISOString().replace(/T/,' ').replace(/\..+/,'')
    });

    link.save(function(err) {
        if(err) console.log('ocorreu erro');
        else {
            response.sendStatus(200);
        }
    })

})

app.listen(port);
console.log('Server is up and listening on port: ' + port);
