var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
var PHPUnserialize = require('php-unserialize');

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('homeStart', function (data) {

                   socket.join(data.deviceid);

                   var latestid = 0;
                                                                //gold                                                                  //premium                                                                                                                                               //random
                   db_multiple.query("SELECT * FROM `obinfo` WHERE `priority` = '5' AND `photo_path` != 'n.jpg' ORDER BY id desc LIMIT 40; SELECT * FROM `obinfo` WHERE `priority` = '4'  AND `photo_path` != 'n.jpg' ORDER BY id desc LIMIT 40; SELECT * FROM `obinfo` WHERE `status` != 'no' AND `status` != 'deleted' ORDER BY priority DESC, `id` DESC LIMIT 40;", function (error, results, fields) {
                     if (error) throw error;

                     for(var i = 0;i < results.length;i++){

                       for(var v = 0;v < results[i].length;v++){
                            //n.jpg
                         if(results[i][v].photo_path != "n.jpg"){
                                results[i][v].photo_path = PHPUnserialize.unserialize(results[i][v].photo_path);
                         }

                         if(results[i][v].video != "нет"){
                                results[i][v].video = PHPUnserialize.unserialize(results[i][v].video);
                         }

                         if(i == 2){
                           latestid = results[i][v].id;
                         }

                       }

                     }
                   // connected!
                   //console.log(results);
                   io.sockets.in(data.deviceid).emit('homeStart', {gold: results[0],premium:results[1],latest:results[2],latestid:latestid});

                   });



              });



        });


};

//complete update count
