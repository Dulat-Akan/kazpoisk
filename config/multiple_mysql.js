var mysql = require('mysql');
var connection = mysql.createConnection({
  multipleStatements: true,
  host     : 'localhost',
  user     : 'root',
  //password : 'googlehack',
   password:'hack7777',
  database : 'mydb'
});

module.exports = connection;
