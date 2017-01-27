import {Router} from 'express';
import {chat} from '../../db';
const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).end();
});

router.get('/search', (req, res, next) => {
  if (req.isAuthenticated()) {
    const regex = new RegExp(req.query.msg);
    chat.find({msg: {$regex: regex}})
        .sort({createdAt: -1})
        .exec((err, docs) => {
          if (err) res.status(500).end();
          else res.json(docs);
        });
  } else {
    res.status(401).end();
  }
});

export default router;
