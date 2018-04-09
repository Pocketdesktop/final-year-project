var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('./config');
var authentication = require('./authentications');
var util = require('util');
var MongoClient = require('mongodb').MongoClient;
var dbConnection = require('./dbconnection');
var utilities = require('./utilities');
var ObjectId = require('mongodb').ObjectId;

router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/getallarticle',function(req, res) {
	var limit = req.body.limit;
	console.log("andar aa gaye hain");
 	var db = dbConnection.getDb();
        db.collection('article').find({},{_id:1,heading:1,photo:1}).sort({date_created:-1}).limit(parseInt(limit)).toArray().then(function(response){
		console.log(response);
		res.json(response);
        }) 
});


router.post('/getallscheme',function(req, res) {
	var limit = req.body.limit;
	console.log("andar aa gaye hain");
 	var db = dbConnection.getDb();
        db.collection('scheme').find({},{_id:1,heading:1,photo:1}).sort({date_created:-1}).limit(parseInt(limit)).toArray().then(function(response){
		console.log(response);
		res.json(response);
        }) 
});

router.post('/getarticle',authentication.isAuthenticated,function(req,res){
	var id = req.body.id;
	console.log(id+"hifhif");
	var db = dbConnection.getDb();
	if(parseInt(id) == 1)
	{
		db.collection('article').find().sort({date_created:-1}).limit(1).toArray().then(function(response){
			console.log(response);
			res.json(response);
		})

	}
	else
	{
	db.collection('article').findOne({_id:ObjectId(id)},function(err,response)
	{
		if(err)
		{
			console.log("err= "+err);
		}
		else
		{
			console.log(response+"response");
			res.json(response);
		}
	})
}
});

router.post('/addarticle',authentication.isAuthenticated,function(req,res){
	console.log(req.body.heading);
	console.log(req.body.htmlcontent);
	var db=dbConnection.getDb();
	var userdata = {'heading':req.body.heading,'body':req.body.htmlcontent,'article_by':'admin','date_created':new Date(utilities.getDateTime())};
	db.collection('article').insertOne(userdata,function(err,response)
	{
		if(err)
		{
			console.log(err+"this error has occured");
		}
		else
		{
			console.log(response);
			res.json(response);
		}
	})

});


module.exports = router;