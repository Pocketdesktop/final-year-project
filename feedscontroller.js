var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var feeds = require('./feeds');
var jwt = require('jsonwebtoken');
var config = require('./config');
var authentication = require('./authentications');


router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/addquery',authentication.isAuthenticated,function(req, res) {
    console.log(req.body);
    feeds.addQuery(req.body, function(err, result) {
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
            res.json({"all posts":result});
    });
});


router.post('/deletequery',authentication.isAuthenticated,function(req,res){
    console.log(req.body);
    var decoded = getToken(req);
    
    feeds.deleteQuery(req.body,decoded,function(err,result){
        if(err)
        {
            res.json({"delete error":"unable to delete the query at this moment"});
        }
        else
        {
            res.json({"delete":"query deleted successfully"});
        }
    
    });


});

router.post('/addanswer',authentication.isAuthenticated,function(req,res){
    console.log(req.body);
    var decoded = getToken(req);
    feeds.addAnswer(req.body,function(err,result)
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
    var decoded = getToken(req);
    feeds.deleteAnswer(req.body,function(err,result){
        if(err)
        {
            res.json({"delete error":"unable to delete the answer at this moment"});
        }
        else
        {
            res.json({"delete":"answer deleted successfully"});
        }
    
    });

});


function getToken(data)
{
    var temp = data.headers.authorization.replace('bearer ', '');
    return jwt.decode(temp);
}


module.exports = router;