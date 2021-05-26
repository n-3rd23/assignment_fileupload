const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('file_uploads', 'alan', 'alan123', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;