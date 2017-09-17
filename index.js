var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var usercontroller = require('./usercontroller');
var dbconnect = require('./dbconnection');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

dbconnect.connectToServer(function(err)
	{
		if(err)
		{
			console.log(err);
		}
		else{
			console.log("jiddd");
		}
	});


app.use('/user', usercontroller);

app.listen(config.port,function(err)
{
	if(err){
		console.log(err);
	}
	else {
		console.log("listening on port 3000 ok");
	}
});


