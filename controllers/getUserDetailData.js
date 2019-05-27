var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
var PHPUnserialize = require('php-unserialize');
var formHelper = require("../models/formHelper.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getUserDetailData', function (data) {

                   socket.join(data.email);

                   var id = data.id;

                   db_multiple.query("SELECT * FROM `obinfo` WHERE `status` != 'no' AND `status` != 'deleted' AND `id` != ? AND `email` = ? ORDER BY priority DESC, `id` DESC LIMIT 40;SELECT * FROM `users` WHERE `email` = ? LIMIT 1;",[id,data.remail, data.remail], function (error, results, fields) {
                     if (error) throw error;

                     for(var i = 0;i < results[0].length;i++){

                         if(results[0][i].photo_path != "n.jpg"){
                                results[0][i].photo_path = PHPUnserialize.unserialize(results[0][i].photo_path);
                         }

                         if(results[0][i].video != "нет"){
                                results[0][i].video = PHPUnserialize.unserialize(results[0][i].video);
                         }


                     }
                   // connected!
                   //console.log(results);
                   io.sockets.in(data.email).emit('getUserDetailData', {data: results[0],usersdata:results[1]});

                   });


              });



        });


};
