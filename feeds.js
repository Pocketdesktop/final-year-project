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
    	//console.log(query);
    	db.collection('feeds').findOne(query,function(err,result){
    		if(err)
    		{
    			callback(err,result);
    		}
    		else{
    			result.answercount=parseInt(result.answercount,10)+1;
                test="answer_"+result.answercount;
                console.log(test);
    			delete data["id"];
    			result.answers[test]=data;
    			//console.log(result.answers);
    			//console.log(result.answers);
  				console.log(result);
  				db.collection("feeds").updateOne(query, result, function(err, res) {
  				//	console.log(err+"hdhdh");
  				//	console.log(res);
    			callback(err,result);
    			});
    		}
    	})


    	
    },


    deleteAnswer(data,callback){
    	var db = dbConnection.getDb();
    	var query = {_id:ObjectId(data.id)};
    	console.log(query);
    	delete data["id"];
    	console.log(data);
    	var answer={};
    	answer[data.answer]="";
    	var test = { $unset : answer };
    	console.log(test);
    	db.collection('feeds').update(query,test, function(err,res)
    		{
    			console.log(err+"dddd");
    			//console.log(res);
    			callback(err,res);
    		});






    }    
    };