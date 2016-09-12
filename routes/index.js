var express = require('express');
var router = express.Router();
var passport = require('../controller/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/chat');
  }else{
    res.render('index', { title: 'Express' });
  }
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login_fail', failureFlash: true }),
    function(req, res){
      res.redirect('/login_success');
});

router.get('/login_success', ensureAuthenticated, function(req, res){
  res.send(req.user);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/');
  }
}

module.exports = router;
