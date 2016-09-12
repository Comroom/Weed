var express = require('express');
var router = express.Router();
var users = db['users'];

const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

router.get('/', function(req, res, next) {
  res.send("/api/users");
});

router.post('/signup', function(req, res){
  var body = req.body;
  if( !body.hasOwnProperty("name") || !body.hasOwnProperty("email") ||
   !body.hasOwnProperty("password") || !regex.test(body.email) ){
    res.status(400).json({
      "error" : "데이터 입력이 잘못되었습니다."
    });
    return;
  }
  if( body.name == "" || body.email == "" || body.password == "" ){
    res.status(400).json({
      "error" : "이름 혹은 비밀번호 혹은 이메일이 입력되지 않았습니다."
    });
    return;
  }
  users.find({ "email" : body.email }, function(err,doc){
    if(err){
      res.status(500).json({
        "error" : "DB 에러"
      });
    }else{
      if(doc.length == 0){
        var user = {
          "name" : body.name,
          "email" : body.email,
          "password" : body.password
        };
        users.insert(user,function(err,docs){
          if(err){
            res.status(500).json({
              "error" : "DB 에러"
            });
          }else{
            res.status(200).json({
              "result" : "가입이 완료되었습니다."
            });
          }
        });
      }else{
        res.status(400).json({
          "error" : "이미 사용중인 이메일주소입니다."
        });
      }
    }
  });
});

module.exports = router;
