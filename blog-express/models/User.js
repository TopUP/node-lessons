const { sequelize } = require('../DB');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type            : DataTypes.INTEGER,
        autoIncrement   : true,
        primaryKey      : true
    },
    first_name: {
        type        : DataTypes.STRING,
        allowNull   : false,
    },
    last_name: {
        type        : DataTypes.STRING,
        allowNull   : false,
    },
    email: {
        type        : DataTypes.STRING,
        allowNull   : false,
        unique      : true,
    },
    password: {
        type        : DataTypes.STRING,
        allowNull   : false,
    },
}, {
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = User
