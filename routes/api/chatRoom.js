var express = require('express');
var router = express.Router();
var chatRoom = db['chatRoom'];

router.get('/', (req, res, next) => {
  chatRoom.find({}).sort({createdAt: 1}).exec((err, docs) => {
    res.status(200).json(docs);
  });
});

router.post('/', function(req, res){
  console.log(req.body.roomName);
  console.log(req.body);

  chatRoom.find({"roomName" : req.body.roomName}, function(err, doc){
    if(err){
      res.status(500).json({"error" : "DB 에러"});
    }else{
      if(doc.length == 0){
        const room = {
          "roomName" : req.body.roomName,
          "createdAt" : new Date(),
          "createUserName" : req.body.name,
          "createUserEmail" : req.body.email,
          "createUserid" : req.body.id
        }
        chatRoom.insert(room, function(err, doc){
          if(err){
            res.status(500).json({"error" : "DB 에러"});
          }else{
            res.status(200).json({ "result" : "채팅방이 생성되었습니다."});
          }
        });
      }else{
        res.status(500).json({"result" : "이미 사용중인 채팅방 이름입니다."});
      }
    }
  });
});

module.exports = router;
