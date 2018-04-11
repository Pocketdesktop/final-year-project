var config = require('./config');
var jwt = require('jsonwebtoken');


module.exports = {
    

// call this function where ever token verification is needed.
//router.use(function(req, res, next) 
isAuthenticated(req, res, next) {
    // ensure that the authorization string contains the string bearer followed by white space only then sub string the token and send for verification.
    if (req.headers.authorization) {
        var token = req.headers.authorization.replace('bearer ', '');
        console.log(token);
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                console.log("error " + err);
                res.json({
                    "token autherization": "the token sent by you is not valid"
                });
            } else {
                next();
            }
        });
    } else {
        res.json({
            "token authorization": "token is not provided"
        });
    }
    //console.log(req.headers.authorization);
    //});
},


isSciIndBdy(req,res,next)
{
    if(req.headers.authorization){
        var token = req.headers.authorization.replace('bearer ', '');
        console.log(token);
        var decoded = jwt.decode(token);
        if(decoded.role == "Scientist" || decoded.role == "Industrial Body")
        {
            next();
        }
        else
        {
            res.json({'error':'you are not authorised to do this job'});
        }

    }
},

isGovBdy(req,res,next)
{
    if(req.headers.authorization){
        var token = req.headers.authorization.replace('bearer ', '');
        console.log(token);
        var decoded = jwt.decode(token);
        if(decoded.role == "Government Body")
        {
            next();
        }
        else
        {
            res.json({'error':'you are not authorised to do this job'});
        }

    }
}






};

