var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getNotification', function (data) {

                   socket.join(data.email);

                   db_multiple.query('SELECT fromUser,toUser FROM chat WHERE toUser = ? AND status = ? ORDER BY id DESC', [data.email,0], function (error, results, fields) {

                       io.sockets.to(data.email).emit('getNotification', {data: results.length});

                   });



              });



        });


};
