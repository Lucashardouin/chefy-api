// db.js
require('dotenv').config();
const mariadb = require('mariadb');

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
};

const pool = mariadb.createPool(dbConfig);

module.exports = pool;
