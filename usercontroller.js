
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('./user');
router.use(bodyParser.urlencoded({ extended: true }));

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
   var userdata = user.getuser(req.body.username,function(err)
        {
            if(err)
                console.log(err);
            else
                console.log("hurray");
        });
   console.log("userdata here");
   console.log(userdata.toArray());
   console.log("aage ka kaam");



    });



module.exports = router;