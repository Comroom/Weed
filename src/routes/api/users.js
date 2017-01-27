/* eslint max-len:0, dot-notation: 0*/
import {Router} from 'express';
import passport from '../../controller/passport';
import {users} from '../../db';
const router = Router();
const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

router.get('/', (req, res, next) => {
  res.json(req.user);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({
    result: '로그인에 성공하였습니다.'
  });
});

router.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.status(200).json({
      result: '로그아웃에 성공하였습니다.'
    });
  } else {
    res.status(401).json({
      error: '인증되지 않는 접근입니다.'
    });
  }
});

router.post('/signup', (req, res) => {
  const body = req.body;
  if (body["name"] === undefined || body["email"] === undefined ||
   body["password"] === undefined || !regex.test(body.email)) {
    res.status(400).json({
      error: '데이터 입력이 잘못되었습니다.'
    });
    return;
  }

  if (body.name === "" || body.email === "" || body.password === "") {
    res.status(400).json({
      error: '이름 혹은 비밀번호 혹은 이메일이 입력되지 않았습니다.'
    });
    return;
  }

  users.find({email: body.email}, (err, doc) => {
    if (err) {
      res.status(500).json({
        error: 'DB 에러'
      });
    }
    if (doc.length === 0) {
      const user = {
        name: body.name,
        email: body.email,
        password: body.password
      };
      users.insert(user, (err, docs) => {
        if (err) {
          res.status(500).json({
            error: 'DB 에러'
          });
        } else {
          res.status(200).json({
            result: '가입이 완료되었습니다.'
          });
        }
      });
    } else {
      res.status(400).json({
        error: '이미 사용중인 이메일입니다.'
      });
    }
  });
});

export default router;
