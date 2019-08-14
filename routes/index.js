var express = require('express');
var router = express.Router();
const { User, sequelize } = require('../config/config')
const crypto = require('crypto');

sequelize.sync().then(() => {
  console.log('MYSQL 연결 완료')
}).catch(err => {
  console.error('MYSQL 연결 실패', err.message)
})

/* GET home page. */
router.get('/login', function (req, res, next) {
  res.render('test', { title: '회원 로그인 페이지' });
});

router.get('/', function (req, res, next) {
  res.render('index', { title: '메인 페이지' });
});

router.post('/signin', (req, res) => {
  let { identity, password } = req.body

  if (!identity || !password) {
    res.status(200).json({
      code: 400,
      message: 'Some parameters are lost..'
    })
  }

  password = crypto.createHash('sha512').update(password).digest('hex');

  User.findOne({
    where: {
      identity,
      password
    }
  }).then(user => {
    if (!user) {
      return res.status(200).json({
        code: 400,
        message: 'user not exists or password wrong.'
      })
    }

    return res.json({
      status: 200,
      message: 'successfully generate a token.',
    });
  }).catch(err => {
    res.status(200).json({
      code: 400,
      message: err.message
    })
  })
})

router.post('/signup', (req, res) => {
  let { identity, password } = req.body

  password = crypto.createHash('sha512').update(password).digest('hex');

  User.findOrCreate({
    where: { identity },
    defaults: {
      password
    }
  }).spread((user, created) => {
    if (!created) {
      res.status(200).json({
        code: 412,
        message: 'User identity duplicated.'
      })
    } else {
      res.status(200).json({
        code: 200,
        message: 'a User successfully created.'
      })
    }
  })
})

module.exports = router;
