var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var userController = require('./usercontroller');
var feedsController = require('./feedscontroller');
var replyController = require('./replyController');
var followController = require('./followcontroller');
var notificationController = require('./notificationcontroller');
var weather = require('./weather');
var article = require('./article');
var scheme = require('./scheme');
var dbConnect = require('./dbconnection');
var app = express();

const fileUpload = require('express-fileupload');
//var express    = require('express')    


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', exten ded: true}));

app.use('/image', express.static('image'))

app.use(fileUpload());

app.use(morgan('dev'));


dbConnect.connectToServer(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("jiddd");
    }
});


  //res.status(404).send({url: req.originalUrl + ' not found'}) use this kind of line to send response to the client. 

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use("/pdf",express.static('pdf'));
app.use('/user', userController);
app.use('/query', feedsController);
app.use('/reply', replyController);
app.use('/follow', followController);
app.use('/weather', weather);
app.use('/article', article);
app.use('/scheme', scheme);
app.use('/notification',notificationController);



app.listen(config.port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("listening on port "+config.port);

    }
});

