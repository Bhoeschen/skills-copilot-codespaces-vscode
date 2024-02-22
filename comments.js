// Create web server
// Load the http module to create an http server.
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getComments', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("comments");
        dbo.collection("comments").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

app.post('/addComment', urlencodedParser, function(req, res) {
    console.log('req.body', req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("comments");
        dbo.collection("comments").insertOne(req.body, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
    res.send('Comment added');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});