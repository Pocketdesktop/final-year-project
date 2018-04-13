var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dbConnection = require('./dbconnection');
var utilities = require('./utilities');
var notification = require('./notification');


module.exports = {

	queryFollow(req,callback)
	{
		var db = dbConnection.getDb();
		var data = req.body;
		var query = {_id:ObjectId(data.id)};
		var user = utilities.getToken(req).username;
		console.log(user);
		console.log(query);
		db.collection('feeds').findOne(query,function(err,result){
    		if(err)
    		{
    			console.log(err);
    			callback(err,result);
    		}
    		else{
    			console.log(result);
    			
    			if(! result.followed_by.includes(utilities.getToken(req).username))
    				result.followed_by.push(utilities.getToken(req).username)
    			else
    				result.followed_by.splice(result.followed_by.indexOf(utilities.getToken(req).username), 1);
                if(! result.notification.includes(utilities.getToken(req).username))
                    result.notification.push(utilities.getToken(req).username);
  				
                notificationdata={}
                notificationdata["user"]=utilities.getToken(req).username;
                notificationdata["alluser"]=result.notification;
                notificationdata["type"]="queryfollow";
                notificationdata["time"] = new Date(utilities.getDateTime());
                 notificationdata["notification"]="follow  <b>  "+result.query +"</b> question";
                notification.addNotification(notificationdata);
  				db.collection("feeds").updateOne(query, result, function(err, res) {
  					console.log(err+"hdhdh");
    			     callback(err,result);
    			});
    		}
    	})


	},


	answerFollow(req,callback)
	{
		var data = req.body;
        var db = dbConnection.getDb();
        var answer_id = data.answerid;
        var qid=data.id;
        var query = {_id:ObjectId(data.id),"answers.id":answer_id};
        //console.log(query);
        db.collection('feeds').findOne(query,{ answers: { $elemMatch: { id: answer_id } },_id:0 } ,function(err,result){
            if(err)
            {
                console.log(err);
                callback(err,result);
            }
            else{
                
                data={}
                data["success"]=true

                console.log(result);
                if(! result.answers[0].upvotes_by.includes(utilities.getToken(req).username))
    				
    				{result.answers[0].upvotes_by.push(utilities.getToken(req).username)
    					data["follow"]=true;
    				}
    			else
    				{result.answers[0].upvotes_by.splice(result.answers[0].upvotes_by.indexOf(utilities.getToken(req).username), 1);
                		data["follow"]=false;
                	}
                if(! result.answers[0].notification.includes(utilities.getToken(req).username))
                    result.answers[0].notification.push(utilities.getToken(req).username);
                notificationdata={}
                notificationdata["user"]=utilities.getToken(req).username;
                notificationdata["alluser"]=result.answers[0].notification;
                notificationdata["type"]="answerfollow";
                notificationdata["time"] = new Date(utilities.getDateTime());
                notificationdata["notification"]="follow   <b>  "+result.answers[0].answer +" answer </b> answer";
                notification.addNotification(notificationdata);
                query = {_id:ObjectId(qid)};
                db.collection("feeds").updateOne(query, {$set:result}, function(err, res) {                     
                callback(err,data);
                });
            }
        });


	}

};