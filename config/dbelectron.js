const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
	password:'googlehack',
  // password:'hack7777',
  database: 'electron'
});

module.exports = connection;
