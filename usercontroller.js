
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('./user');
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/add', function (req, res) {
  // console.log(req.body);
    user.adduser(req.body,function(err)
        {
            if(err)
                console.log(err);
            else
                console.log("hurray");
        });



    });

module.exports = router;