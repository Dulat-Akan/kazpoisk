const mysql = require('mysql2');

const connection = mysql.createConnection({
//  host: 'localhost',
  host: '18.218.27.49',
  user: 'remote',
	password:'hack7777!!!!',
	//password:'googlehack',
	// password:'hack7777',
  database: 'mydb'
});

module.exports = connection;
