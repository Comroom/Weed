/* eslint handle-callback-err:0*/
import {Router} from 'express';
import passport from '../controller/passport';
import upload from '../controller/multer';
import fse from 'fs-extra';
import async from 'async';
import path from 'path';
import {chat, chatRoom} from '../db';
const router = Router();

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/chat');
  } else {
    res.render('index');
  }
});


router.get('/chat', (req, res) => {
  if (req.isAuthenticated()) {
    chatRoom.find({}).sort({createdAt: 1}).exec((err, docs) => {
      res.render('chat', {rooms: docs});
    });
  } else {
    res.redirect('/');
  }
});

router.post('/upload', upload.single('file'), (req, res) => {
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
        global.io.emit('toclient', doc);
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


router.get('/chat/:chatId', (req, res) => {
  if (req.isAuthenticated()) {
    chatRoom.find({}).sort({createdAt: 1}).exec((err, docs) => {
      res.render('chat', {rooms: docs});
    });
  } else {
    res.redirect('/');
  }
});

router.get('/signup', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signup');
  }
});

router.post('/login',
    passport.authenticate('local', {failureRedirect: '/', failureFlash: true}),
    (req, res) => {
      res.redirect('/chat');
    });

router.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

router.get('/search', (req, res) => {
  res.redirect('/chat');
});

router.get('/search/:message', (req, res) => {
  if (req.isAuthenticated()) {
    const regex = new RegExp(req.params.message);
    chat.find({msg: {$regex: regex}})
        .sort({createdAt: -1})
        .exec((err, docs) => {
          if (err) throw new Error(500);
          else chatRoom.find({}).sort({createdAt: 1}).exec((err, rooms) => {
            res.render('search', {rooms: rooms, result: docs});
          });
        });
  } else {
    res.redirect('/');
  }
});

export default router;
