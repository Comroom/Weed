var express = require('express');
var router = express.Router();
var passport = require('../controller/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/chat');
  }else{
    res.render('index');
  }
});

router.get('/chat', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('chat');
  }else{
    res.redirect('/');
  }
});

router.get('/chat/:chatId', function(req, res, next){
  if(req.isAuthenticated()){
    res.render('chat');
  }else{
    res.redirect('/');
  }
});

router.get('/signup', function(req, res, next){
  if(req.isAuthenticated()){
    res.redirect('/');
  }else{
    res.render('signup');
  }
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
    function(req, res){
      res.redirect('/chat');
});

router.get('/logout', function(req, res){
  if(req.isAuthenticated()){
    req.logout();
    res.redirect('/');
  }else{
    res.redirect('/');
  }
});

module.exports = router;
