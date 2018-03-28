var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dbConnection = require('./dbconnection');
var utilities = require('./utilities');


module.exports = {


    addQueryReply(req, callback) {
        var data = req.body;
        var db = dbConnection.getDb();
        var query = {_id:ObjectId(data.id)};
        //console.log(query);
        db.collection('feeds').findOne(query,function(err,result){
            if(err)
            {
                console.log(err);
                callback(err,result);
            }
            else{
                //console.log(data);
                data["reply_time"] = new Date(utilities.getDateTime());
                data["reply_by"] = utilities.getToken(req).username;
                //console.log(data);
                //process.exit();
                result.replycount=result.replycount+1;
                test="reply_"+result.replycount;
                console.log(test);
                data["id"]=test;
                data["len"]=0
                result.reply.push(data);
                //console.log(result.answers);
                //console.log(result.answers);
                console.log(result);
                //process.exit();
                db.collection("feeds").updateOne(query, result, function(err, res) {
                    //console.log(err+"hdhdh");
                  console.log(res);
                callback(err,data);
                });
            }
        });
    },



getQueryReply(req, callback) {
        var data = req.body;
        var db = dbConnection.getDb();
        var query = {_id:ObjectId(data.id)};
        //console.log(query);
        db.collection('feeds').findOne(query,{reply:1,replycount:1},function(err,result){
            if(err)
            {
                console.log(err);
                callback(err,result);
            }
            else{
                //console.log(data);
                 callback(err,result);
                
              
            }
        });
    },
   

    deleteQueryReply(req,callback){
        var data = req.body;
        //console.log(data);
        var db = dbConnection.getDb();
        var query = {_id:ObjectId(data.id)};
        //console.log("query = "+query)
        db.collection('feeds').findOne(query,function(err,result)
        {
            if(err)
            {
                callback(err,result);
            }
            else
            {
                console.log(result.reply);
                var replyName = data.reply;
                //console.log(replyName);
                console.log(result.reply[replyName].reply_by+" "+utilities.getToken(req).username);
                //process.exit();
                if(result.reply[replyName].reply_by==utilities.getToken(req).username)
                {
                    var reply = {};
                    var temp = "reply."+data.replyName;
                    reply[temp]="";
                    var test = { $unset : reply };
                    console.log(test);
                    console.log(query);
                    db.collection('feeds').update(query,test,function(errr,response){
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


    addAnswerReply(req, callback) {
        var data = req.body;
        var db = dbConnection.getDb();
        var answer_id = data.answer;
        var query = {_id:ObjectId(data.id),"answers.id":answer_id};
        //console.log(query);
        db.collection('feeds').findOne(query,{ answers: { $elemMatch: { id: answer_id } } } ,function(err,result){
            if(err)
            {
                console.log(err);
                callback(err,result);
            }
            else{
                
                console.log(result);
                //console.log(data);
                data["reply_time"] = new Date(utilities.getDateTime());
                data["reply_by"] = utilities.getToken(req).username;
                result.answers[answer_id].reply_count=result.answers[answer_id].reply_count+1;
                test="reply_"+result.answers[0].reply_count;
                console.log(test);
                data["id"]=test;
                data["len"]=0;
                //data["len"]=result.answers[0].len
                delete data["answer"];
                result.answers[0].reply.push(data);
                console.log(result);
                //process.exit();
                db.collection("feeds").updateOne(query, result, function(err, res) {
                    //console.log(err+"hdhdh");
                 console.log(data);
                callback(err,data);
                });
            }
        });
    },


 getAnswerReply(req, callback) {
        var data = req.body;
        var db = dbConnection.getDb();
        var answer_id = data.answerid;
        var query = {_id:ObjectId(data.id),"answers.id":answer_id};
        //console.log(query);
        db.collection('feeds').findOne(query,{ answers: { $elemMatch: { id: answer_id } } },function(err,result){
            if(err)
            {
                console.log(err);
                callback(err,result);
            }
            else{
                
                console.log(answer_id);
                data={};
                data['replycount']=result.answers[0].reply_count;
                data["reply"]=result.answers[0].reply;
                callback(err,data);
               
            }
        });
    },

deleteAnswerReply(req,callback){
        var data = req.body;
        //console.log(data);
        var db = dbConnection.getDb();
        var query = {_id:ObjectId(data.id)};
        //console.log("query = "+query)
        db.collection('feeds').findOne(query,function(err,result)
        {
            if(err)
            {
                callback(err,result);
            }
            else
            {
                var answer_id = data.answer;
                console.log(result.answers[answer_id].reply);
                var replyName = data.reply;
                //console.log(replyName);
                console.log(result.answers[answer_id].reply[replyName].reply_by+" "+utilities.getToken(req).username);
                //process.exit();
                if(result.answers[answer_id].reply[replyName].reply_by==utilities.getToken(req).username)
                {
                    var reply = {};
                    var temp = "answers."+answer_id+".reply."+replyName;
                    reply[temp]="";
                    var test = { $unset : reply };
                    console.log(test);
                    console.log(query);
                   // process.exit();
                    db.collection('feeds').update(query,test,function(errr,response){
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

    }


};