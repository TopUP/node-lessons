require('dotenv').config({});
const { Sequelize } = require('sequelize');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DIALECT } = process.env

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host    : DB_HOST,
    dialect : DB_DIALECT
});

const initDB = async () => {
    const associations = require('./models/associations');

    await sequelize.sync({
        alter: true,
        force: true
    });
}

module.exports = { sequelize, initDB };
