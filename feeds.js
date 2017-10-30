var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dbConnection = require('./dbconnection');

module.exports = {

  addQuery(data, callback) {
        var db = dbConnection.getDb();
                db.collection('feeds').insertOne(data, function(err, response) {
                    if (err)
                        console.log(err);
                    else
                        console.log("query added successfully");
                    callback(err,response);
                });
                
            },

	
	getAllPost(callback)
	{
		  var db = dbConnection.getDb();
          db.collection('feeds').find().toArray()
              .then(function(items) {
                  console.log("items= "+items);
                  callback(items);
              });
	},


    deleteQuery(data,decoded,callback){
    	var db = dbConnection.getDb();
    	var query = {_id:ObjectId(data.id)};
    	console.log("query = "+query)
    	db.collection('feeds').findOne(query,function(err,result)
    	{
    		console.log("error = "+err);
    		console.log("result = "+result);
    		if(err)
    		{
    			callback(err,result);
    		}
    		else
    		{
    			console.log(result.query_by+" "+decoded.username);
    			if(result.query_by==decoded.username)
    			{
    				db.collection('feeds').remove(query,function(errr,response){
    					console.log("errr = "+errr);
    					console.log("response = "+response);
    				callback(errr,response);
			    	})    				
    			}
    			else
    			{
    				err = "you are not authorized to access this";
    				console.log(err+"ddd");
    				callback(err,result);
    			}
    		}
    	});


    },


    addAnswer(data,callback)
    {
    	var db = dbConnection.getDb();
    	var query = {_id:ObjectId(data.id)};
    	console.log(query);
    	db.collection('feeds').findOne(query,function(err,result){
    		if(err)
    		{
    			callback(err,result);
    		}
    		else{
    			var test = Object.keys(result.answers).length;
    			console.log(test+" length of answers");
    			test=test+1;
    			test="answers.answer_"+test;
    			delete data["id"];
    			var newAnswer = {};
    			newAnswer[test] = data;
    			console.log(newAnswer);
    			var newvalues = { $set:{newAnswer}};
  				db.collection("feeds").updateOne(query, newAnswer, function(err, res) {
  					console.log(err+" error");
  					console.log(result+" result");
  				})

    			callback(err,result);
    		}
    	})


    	
    },


    deleteAnswer(data,callback){
    	var db = dbConnection.getDb();
    	var query = {_id:"objectId('"+data.id+"')"};
    }    
    };