var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  if(!req.isAuthenticated()){

    res.redirect('/accounts/login');

  }
  else{

    res.render('./chat/chat.ejs');

  }

});

module.exports = router;
