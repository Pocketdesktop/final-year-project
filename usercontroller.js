var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('./user');
var jwt = require('jsonwebtoken');
var config = require('./config');

router.use(bodyParser.urlencoded({ extended: true }));

// call this function where ever token verification is needed.
//router.use(function(req, res, next) 
function isauthenticated(req, res, next)
{
    // ensure that the authorization string contains the string bearer followed by white space only then sub string the token and send for verification.
    if(req.headers.authorization)
    {
       var token = req.headers.authorization.replace('bearer ', '');
       console.log(token);
       jwt.verify(token, config.secretkey, function(err, decoded){
        if(err)
        {
            console.log("error "+err);
            res.send("there is some error with the token so you are not authorized");
        }
        else
        {
            next();
        }
        
       }); 
    }
    else
    {
        res.send("you are not authorized because token is not provided");
    }
    console.log('Something is happening.test here and do your stuff here');
    //console.log(req.headers.authorization);
    
//});
}


    




router.post('/register', function (req, res) {
  // console.log(req.body);
    user.adduser(req.body,function(err)
        {
            if(err)
                console.log(err);
            else
                console.log("hurray");
        });
    });


router.post('/login', function (req, res) {
  // console.log(req.body);
   var userdata = user.getuser(req.body.username,function(response)
        {
                console.log(response);
                console.log(response[0].password);
                if(req.body.username === response[0].password)
                {
                    console.log("password is correct");
                    jwt.sign({ username: response[0].username },config.secretkey, { algorithm: 'HS256' } , function(err, token) {
                    console.log(token);
                    console.log(err);
                    res.json({"token": token});
                    });
   
                }
                else
                {
                    console.log("password is incorrect");
                }
        });
    });


router.post('/hello',isauthenticated, function (req, res) {
  // console.log(req.body);
   var token = req.headers.authorization.replace('bearer ', '');
  var decoded = jwt.decode(token);
   console.log("token verified and all");
   res.send("your token is verified"+decoded.username);
    });




module.exports = router;