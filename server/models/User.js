const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const File = require('./File');

const User = sequelize.define('user', {
	email: {
		type: DataTypes.STRING,
		isEmail: true,
	}
});

module.exports = User;