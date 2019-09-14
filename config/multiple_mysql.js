var mysql = require('mysql');
// var connection = mysql.createConnection({
//   multipleStatements: true,
//   host     : '18.218.27.49',
//   user     : 'remote',
//   password : 'hack7777!!!!',
//   database : 'mydb'
// });


var connection = mysql.createConnection({
  multipleStatements: true,
  host     : 'localhost',
  user     : 'root',
  password : 'googlehack',
  // password:'hack7777',
  database : 'mydb'
});

module.exports = connection;
