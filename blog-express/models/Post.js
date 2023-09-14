const { sequelize } = require('../DB');
const { DataTypes } = require('sequelize');

const Post = sequelize.define('Post', {
    id: {
        type            : DataTypes.INTEGER,
        autoIncrement   : true,
        primaryKey      : true,
    },
    user_id: {
        type        : DataTypes.INTEGER,
        allowNull   : false,
    },
    title: {
        type        : DataTypes.STRING,
        allowNull   : false,
    },
    content: {
        type        : DataTypes.STRING,
        allowNull   : false,
    },
    preview: {
        type        : DataTypes.STRING,
        allowNull   : false,
    },
    publish_at: {
        type        : DataTypes.DATE,
        allowNull   : false,
    },
}, {
    tableName: 'posts',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Post
