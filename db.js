const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// 별도로 connect할 필요X
const pool = mysql.createPool({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const db = pool.promise();

module.exports = db;