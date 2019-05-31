var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'googlehack',
  database        : 'mydb'
});

module.exports = pool;
