const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const User = require('./User')

const File = sequelize.define('file', {
	fileName: {
		type: DataTypes.STRING
	}
});


module.exports = File;