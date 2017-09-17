var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config')

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


MongoClient.connect(config.dburi, function(err, db) {

	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log("connected to database");
	}
  db.close();
});



app.listen(config.port,function(err)
{
	if(err){
		console.log(err);
	}
	else {
		console.log("listening on port 3000 ok");
	}
});