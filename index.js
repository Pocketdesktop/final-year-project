var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose')

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect("mongodb://127.0.0.1:27017/mydb")
mongoose.connection.once("connected",function()
{
	console.log("database connected successfully");
})

app.listen(3000,function(err)
{
	if(err){
		console.log(err);
	}
	else {
		console.log("listening on port 3000 ok");
	}
});