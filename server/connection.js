const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('file_uploads', 'alan', 'alan123', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
.then(() => {
	console.log("connection success...");
})
.catch(err => {
	console.log("error connecting to database or database service is not running....");
})

module.exports = sequelize;