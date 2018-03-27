var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dbConnection = require('./dbconnection');
var utilities = require('./utilities');


module.exports = {

	queryFollow(req,callback)
	{
		var db = dbConnection.getDb();
		var data = req.body;
		var query = {_id:ObjectId(data.id)};
		var user = utilities.getToken(req).username;
		console.log(user);
		console.log(query);
		db.collection("feeds").update(query,{$addToSet :{followed_by : user}},function(err,result){
			console.log(err+"error");
			console.log(result+"result");
			console.log("hello");
			callback(err,result);

		});


		/*process.exit();
		db.collection("feeds").findOne(query,function(err,result){
			if(err)
			{
				callback(err,result);
			}
			else{
				console.log("hello world");
				console.log(result.followed_by);


				process.exit();
				callback(err,result);
			}


		});*/


	}
};