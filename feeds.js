var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dbConnection = require('./dbconnection');
var utilities = require('./utilities');
var notification = require('./notification');

module.exports = {

  addQuery(req, callback) {
        var db = dbConnection.getDb();
        var data = req.body;
        data["time"] = new Date(utilities.getDateTime());
        data["status"] = "ok";
        data["answers"] = [];
        data["answercount"] = 0;
        data["query_by"] = utilities.getToken(req).username;
        data["replycount"] = 0;
        data["reply"] = [];
        data["followed_by"] = [];
        data["notification"]=[];
        data["notification"].push(utilities.getToken(req).username);
        data["len"]=0;
        data["follow_count"]=0;
        console.log(data);
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
          db.collection('feeds').find({},{query:1,query_by:1,tags:1,status:1,time:1,description
            :1,len:1,followed_by:1,answers:1,reply:1}).sort({time:-1}).toArray()
              .then(function(items) {
                  console.log("items= "+items);
                  callback(items);
              });
	},
    userAllPost(req,callback)
    {
          var db = dbConnection.getDb();
          var user=utilities.getToken(req).username;
          db.collection('feeds').find({query_by:user},{query:1,query_by:1,tags:1,status:1,time:1,description
            :1,len:1,followed_by:1,answers:1,reply:1}).sort({time:-1}).toArray()
              .then(function(items) {
                  console.log("items= "+items);
                  callback(items);
              });
    },

    userAllAnswer(req,callback)
    {
          var db = dbConnection.getDb();
          var user=utilities.getToken(req).username;
          console.log(user);
          db.collection('feeds').find({"answers.answer_by":user},{answers:1,_id:1}).sort({time:-1}).toArray()
              .then(function(items) {
                  console.log("items= "+items);
                  callback(items);
              });
    },

    getAllPostDetail(req,callback)
    {   
        var data = req.body;
        var user=utilities.getToken(req).username;
        var query={_id:ObjectId(data.id)};
        console.log(query);
          var db = dbConnection.getDb();
          db.collection('feeds').findOne(query,{replycount:0,'answers.reply':0},function(err,result)
            {
                console.log(result);
                if(err)
            {
                console.log(err);
                callback(err,result);

            }
            else
            {
                if(result.followed_by.includes(user))
                {
                    result.follow=true;
                }
                else
                {
                    result.follow=false;
                }
                result.follow_count=result.followed_by.length;
                callback(err,result);
            }

            });
    },



    deleteQuery(req,callback)
    {
    	var data = req.body;
    	var decoded = utilities.getToken(req);
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
    				    callback(err,response);
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
    			data["reply"] = [];
    			result.answercount=result.answercount+1;
                result.len=result.len+1;
                test="answer_"+result.answercount;
    			data["id"]=test;
                data["len"]=0;
                data["upvotes_by"]=[];
                data["notification"]=[];
                data["notification"].push(utilities.getToken(req).username);
    			if(result.answercount==0)
    			{
    				result["answers"]=[];
    			}	
    			result.answers.push(data);
                if(! result.notification.includes(utilities.getToken(req).username))
                    result.notification.push(utilities.getToken(req).username);
  				notificationdata={}
                notificationdata["user"]=utilities.getToken(req).username;
                notificationdata["alluser"]=result.notification;
                notificationdata["type"]="answer";
                notificationdata["notification"]="post a answer on "+result.query;
                notificationdata["id"]=data["id"]
                notificationdata["time"]=new Date(utilities.getDateTime());
                notification.addNotification(notificationdata);
                db.collection("feeds").updateOne(query, result, function(err, res) {
  					console.log(err+"hdhdh");
    			     callback(err,result);
    			});
    		}
    	})


    	
    },


    deleteAnswer(data,callback)
    {
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