var express = require('express');
var router = express.Router();
var passport = require('../controller/passport');
var upload = require('../controller/multer');
var fs = require('fs');
var fse = require('fs-extra');
var async = require('async');
var path = require('path');
var chat = db['chat'];
var chatRoom = db['chatRoom'];

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/chat');
  }else{
    res.render('index');
  }
});

router.get('/chat', function(req, res, next) {
  if(req.isAuthenticated()){
    chatRoom.find({}).sort({createdAt: 1}).exec((err, docs) => {
      res.render('chat', { rooms : docs });
    });
  }else{
    res.redirect('/');
  }
});

router.post('/upload', upload.single('file'), function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const id = req.body.id;
  const file = req.file;
  async.series([
    callback => {
      fse.copy(file.path, path.join('./files', file.filename), err => {
        if (err) {
          res.status(500).end();
        } else {
          callback(null, true);
        }
      });
    },
    callback => {
      fse.remove(file.path, err => {
        if (err) {
          res.status(500).end();
        } else {
          callback(null, true);
        }
      });
    },
    callback => {
      const doc = {
        type: "file",
        createdAt: new Date(),
        name: name,
        userid: id,
        email: email,
        filename: file.filename,
        msg: file.filename,
        path: path.join('./files', file.filename)
      };
      chat.insert(doc, (err, doc) => {
        if (err) {
          res.status(500).end();
          return;
        }
        res.status(200).end();
        io.emit('toclient', doc); //global.io
      });
    }
  ]);
});

router.get('/upload/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../files', req.params.filename);
  async.series([
    callback => {
      fse.access(filePath, err => {
        if (err) {
          res.status(404).end();
        } else {
          callback(null);
        }
      });
    },
    callback => {
      res.download(filePath);
    }
  ]);
});

router.get('/chat/:chatId', function(req, res, next){
  if(req.isAuthenticated()){
    chatRoom.find({}).sort({createdAt: 1}).exec((err, docs) => {
      res.render('chat', { rooms : docs });
    });
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
  if(req.isAuthenticated()){
    req.logout();
    res.redirect('/');
  }else{
    res.redirect('/');
  }
});

router.get('/search', function(req, res){
  res.redirect('/chat');
});

router.get('/search/:message', function(req, res){
  if(req.isAuthenticated()){
    const regex = new RegExp(req.params.message);
    chat.find({ msg : { $regex : regex }}).sort({ createdAt : -1 }).exec((err, docs) => {
      res.render('search',{ result : docs });
    });
  }else{
    res.redirect('/');
  }
});

module.exports = router;
