const express = require('express');
const router = express.Router();
const chat = db['chat'];

router.get('/', (req, res, next) => {
  res.status(200).end();
});

router.get('/search', (req, res, next) => {
  if(req.isAuthenticated()){
    const regex = new RegExp(req.query.msg);
    chat.find({ msg : { $regex : regex }}).sort({ createdAt : -1 }).exec((err, docs) => {
      res.json(docs);
    });
  } else {
    res.status(401).end();
  }
});

module.exports = router;
