var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');


var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.listen(3000,function(err)
{
	if(err){
		console.log(err);
	}
	else {
		console.log("listening on port 3000 ok");
	}
});