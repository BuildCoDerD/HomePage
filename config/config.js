const Sequelize = require('sequelize');

//MYSQL 세팅
const sequelize = new Sequelize('game_person', 'root', '3712', {
  host: 'localhost',
  dialect: 'mysql',
});

//MYSQSL 테이블 생성
const User = sequelize.define('user', {
  identity: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  }
});

module.exports = {
  User,
  sequelize
};