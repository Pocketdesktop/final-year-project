var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dbConnection = require('./dbconnection');
var utilities = require('./utilities');

module.exports = {

  addQuery(req, callback) {
        var db = dbConnection.getDb();
        var data = req.body;
        data["time"] = new Date(utilities.getDateTime());
        data["status"] = "ok";
        data["answers"] = {};
        data["answercount"] = 0;
        data["query_by"] = utilities.getToken(req).username;
        data["replycount"] = 0;
        data["reply"] = {};

        console.log(data);
		//process.exit();
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


    addAnswer(req,callback)
    {
    	var db = dbConnection.getDb();
    	var query = {_id:ObjectId(req.body.id)};
    	//console.log(query);
    	db.collection('feeds').findOne(query,function(err,result){
    		if(err)
    		{
    			console.log(err);
    			callback(err,result);
    		}
    		else{
    			var data = req.body;
    			data["answer_by"] = utilities.getToken(req).username;
    			data["answer_time"] = new Date(utilities.getDateTime());
    			data["upvotes"] = 0;
    			data["answer_status"] = "ok";
    			data["reply_count"] = 0;
    			data["reply"] = {};
    			//console.log(data);
    			//process.exit();

    			result.answercount=result.answercount+1;
                test="answer_"+result.answercount;
                console.log(test);
    			delete data["id"];
    			if(result.answercount==0)
    			{
    				result["answers"]={};
    			}
    			
    			result.answers[test]=data;
    			//console.log(result.answers);
    			//console.log(result.answers);
  				console.log(result);
  				//process.exit();
  				db.collection("feeds").updateOne(query, result, function(err, res) {
  					console.log(err+"hdhdh");
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
    	var temp = "answers."+data.answer;
    	answer[temp]="";
    	var test = { $unset : answer };
    	console.log(test);
    	process.exit();
    	db.collection('feeds').update(query,test, function(err,res)
    		{
    			console.log(err+"dddd");
    			//console.log(res);
    			callback(err,res);
    		});






    }    
    };