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


router.post('/uploadpdf',authentication.isAuthenticated,function(req, res) {
	console.log(req.files.file);
	console.log(req.body.scheme_heading);
	console.log(req.body.scheme_description);
	let sampleFile = req.files.file;
    let path = "./pdf/"+req.files.file.name;
    console.log(path);     
          // Use the mv() method to place the file somewhere on your server
          sampleFile.mv(path, function(err) {
          	if(err)
          		{
          		    console.log(err);
          		    res.json({'scheme':'error has occured please try later'});
          		}
          	else{
          			let userData = {'date_created': new Date(utilities.getDateTime()),'heading':req.body.scheme_heading,'description':req.body.scheme_description,'pdf':req.files.file.name};
          			let db = dbConnection.getDb();
          			console.log(userData);
          			db.collection('scheme').insertOne(userData, function(err, response){
          				if(err)
          				{
          					console.log(err);
          					res.json({'scheme':'error has occured please try later'});
          				}
          				else{
          					res.json({'scheme':'success'});
          				}
          			})
          	}
             });
          	
	});

router.get('/getallscheme',authentication.isAuthenticated,function(req,res)
{
	console.log("i will send links to all the pdfs");
	let db = dbConnection.getDb();
	db.collection('scheme').find().sort({date_created:-1}).toArray().then(function(response){
		res.json(response);
	}
)});



module.exports = router;