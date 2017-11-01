var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var userController = require('./usercontroller');
var feedscontroller = require('./feedscontroller');
var dbConnect = require('./dbconnection');
var app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(morgan('dev'));


dbConnect.connectToServer(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("jiddd");
    }
});


  //res.status(404).send({url: req.originalUrl + ' not found'}) use this kind of line to send response to the client. 

/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '14.139.233.50');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});*/

app.use('/user', userController);
app.use('/query', feedscontroller);

app.listen(config.port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("listening on port 3000 ok");

    }
});