const Sequelize = require('sequelize');

const connectionUrl = 'postgres://valor:valor@localhost:5432/valordb';
const database = new Sequelize(connectionUrl);

module.exports = database;