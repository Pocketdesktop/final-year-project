var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var feeds = require('./feeds');
var jwt = require('jsonwebtoken');
var config = require('./config');
var authentication = require('./authentications');
var utilities = require('./utilities');


router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/addquery',authentication.isAuthenticated,function(req, res) {
    //console.log(req.body);
   // process.exit();
    feeds.addQuery(req, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "addquery error": "unable to add query at this moment"
            });
        } else {
            res.json({
                "addquery": "added query successfully",
                "last_query": req.body
            });
        }
    });
});


router.get('/getallpost',authentication.isAuthenticated, function(req,res){
    console.log(req.body);
    feeds.getAllPost(function(result){
            //res.json({"all posts":result});
            console.log(result)
            var user = utilities.getToken(req).username
            var data=[]
            for(var i=0;i<result.length;i++)
            {
                if (result[i].followed_by.includes(user))
                   result[i].follow=true;
                else
                    result[i].follow=false;
                result[i].follow_count=result[i].followed_by.length

            }
           res.json({"all posts":result}); 
    });
});


router.get('/getallposts',function(req,res){
    console.log(req.body);
    feeds.getAllPost(function(result){
            //res.json({"all posts":result});
            
            var data=[]
            for(var i=0;i<result.length;i++)
            {
               
                result[i].follow_count=result[i].followed_by.length

            }
           res.json({"all posts":result}); 
    });
});

router.get('/userallpost',authentication.isAuthenticated, function(req,res){
    console.log(req.body);
    feeds.userAllPost(req,function(result){
            //res.json({"all posts":result});
            console.log(result)
            var user = utilities.getToken(req).username
            var data=[]
            for(var i=0;i<result.length;i++)
            {
                if (result[i].followed_by.includes(user))
                   result[i].follow=true;
                else
                    result[i].follow=false;
                result[i].follow_count=result[i].followed_by.length

            }
           res.json({"all posts":result}); 
    });
});


router.get('/userallanswer',authentication.isAuthenticated, function(req,res){
    console.log(req.body);
    feeds.userAllAnswer(req,function(result){
            //res.json({"all posts":result});
            console.log(result)
            
           res.json({"all posts":result}); 
    });
});


router.post('/getpostdetail', function(req,res){
    console.log(req.body);
    feeds.getAllPostDetail(req,function(err,result){
            var user = utilities.getToken(req).username;
            for(var i=0;i<result.answers.length;i++)
             {
                if (result.answers[i].upvotes_by.includes(user))
                   result.answers[i].follow=true;
                else
                    result.answers[i].follow=false;
                result.answers[i].follow_count=result.answers[i].upvotes_by.length

            }

            res.json({"all posts":result,succes:true});

    });
});

router.post('/deletequery',authentication.isAuthenticated,function(req,res){
    console.log(req.body);
    
    feeds.deleteQuery(req,function(err,result){
        if(err)
        {
            res.json({"delete query error":"unable to delete the query at this moment"});
        }
        else
        {
            res.json({"delete query":"query deleted successfully"});
        }
    
    });


});

router.post('/addanswer',authentication.isAuthenticated,function(req,res){
   // console.log(req.body);
    feeds.addAnswer(req,function(err,result)
    {
        if(err)
        {
            res.json({"add answer error":"unable to add answer at this moment"});
        }
        else{
            res.json({"add answer":"answer added successfully"});
        }
    });
});


router.post('/deleteanswer',authentication.isAuthenticated,function(req,res){
    console.log(req.body);
    feeds.deleteAnswer(req.body,function(err,result){
        if(err)
        {
            res.json({"delete answer error":"unable to delete the answer at this moment"});
        }
        else
        {
            res.json({"delete answer":"answer deleted successfully"});
        }
    
    });

});




module.exports = router;