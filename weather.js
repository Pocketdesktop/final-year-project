var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('./config');
var request = require('request');

router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/getweather',function(req, res) {


var type = req.body.type;
var degreetype = req.body.degreetype;
var apiKey = config.weatherapikey;
//var url = http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}'
var url;
var degree="";
console.log(type+" "+degreetype);
switch(degreetype)
{
	case "1":degree="imperial";
	console.log("switch 1 degree");
	break;
	case "2":degree="metric";
	break;
	default:degree="metric";
	console.log("defauld");
}

switch(type)
{
	case "1": url=config.weatherbaseurl+"q="+req.body.city+"&units="+degree+"&appid="+apiKey+"";
	console.log("switch 1 type");
	break;
	case "2": url=config.weatherbaseurl+"lat="+req.body.lat+"&lon="+req.body.lon+"&units="+degree+"&appid="+apiKey+"";
	break;
	default:
	console.log("default");
}
console.log(url+"ggygy");

request(url, function (err, response, body) {
  if(err){
    console.log('error:', err);
  } else {
    console.log('body:', body);
    res.json(body);
  }
});


});




router.post('/gethourlyweather',function(req,res){
	var lat = req.body.lat;
	var lon = req.body.lon;
	var url=config.hourlybaseurl+"lat="+lat+"&lon="+lon+"&units=metric&appid="+config.weatherapikey;
	console.log(url);
	request(url,function(err, response, body)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(body);
			res.json(JSON.parse(body));
		}



	})








});
module.exports = router;


