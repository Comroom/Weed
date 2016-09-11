var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/chat', function(req, res, next) {
  res.render('chat');
});

router.get('/chat/:chatId', function(req, res, next){
  res.render('chat');
});

router.get('/logout', function(req, res, next){
  res.render('index');
});
module.exports = router;
