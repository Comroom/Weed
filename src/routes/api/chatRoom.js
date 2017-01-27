/* eslint handle-callback-err:0*/
import {Router} from 'express';
import {chatRoom} from '../../db';
const router = Router();

router.get('/', (req, res, next) => {
  chatRoom.find({}).sort({createdAt: 1}).exec((err, docs) => {
    res.status(200).json(docs);
  });
});

router.post('/', (req, res) => {
  chatRoom.find({roomName: req.body.roomName}, (err, doc) => {
    if (err) {
      res.status(500).json({error: "DB 에러"});
      return;
    }
    if (doc.length === 0) {
      const room = {
        roomName: req.body.roomName,
        createdAt: new Date(),
        createUserName: req.body.name,
        createUserEmail: req.body.email,
        createUserid: req.body.id
      };
      chatRoom.insert(room, (err, doc) => {
        if (err) {
          res.status(500).json({error: "DB 에러"});
        } else {
          res.status(200).json({result: "채팅방이 생성되었습니다."});
        }
      });
    } else {
      res.status(500).json({result: "이미 사용중인 채팅방 이름입니다."});
    }
  });
});

export default router;
