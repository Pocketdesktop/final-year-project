var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dbConnection = require('./dbconnection');
var utilities = require('./utilities');




module.exports = {

	addNotification(data)
	{
		 var db = dbConnection.getDb();
		 data["read"]=false
		 db.collection('notifications').insertOne(data, function(err, response) {
                        if (err)
                            console.log(err);
                        else
                            console.log("user added succesfully");
        });
	},

	getAllNotification(req,callback)
	{
		var db = dbConnection.getDb();
        user=utilities.getToken(req).username;
        //console.log(query);
        db.collection('notifications').find({alluser:user},{alluser:0}).sort({time:-1}).toArray()
              .then(function(items) {
                  console.log("items= "+items);
                  callback(items);
              });
	},

	getNotificationCount(req,callback)
	{
		var db = dbConnection.getDb();
        user=utilities.getToken(req).username;
        //console.log(query);
        db.collection('notifications').find({$and : [{alluser:user},{user : {$ne:user}},{read:false}]},{alluser:0}).sort({time:-1}).toArray()
              .then(function(items) {
                  console.log("items= "+items);
                  callback(items.length);
              });
	}
};