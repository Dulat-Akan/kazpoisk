var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getUserDetailData', function (data) {

                   socket.join(data.email);



                   io.sockets.in(data.email).emit('getUserDetailData', {msg: 'test_message'});

              });



        });


};
