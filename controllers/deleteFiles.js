var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
var ncp = require('ncp').ncp;

var path = require('path');
const fs = require('fs');

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('deleteFiles', function (data) {

                   socket.join(data.email);

                   ncp.limit = 16;


                   setTimeout(function(){

                     //step 2 copy to destination directory
                     //copy images
                     //var productionfinishpath = '../../kazpoisk/assets/entry/uploads';
                     var productionfinishpath = '../../Sites/assets/entry/uploads';

                     ncp(productionoutput_path, productionfinishpath, function (err) {
                      if (err) {
                        return console.error(err);
                      }
                      //console.log('done!');
                     });

                     //copy images

                     setTimeout(function(){

                       //step3 delete from directory

                       fs.readdir(productionoutput_path, (err, files) => {
                         if (err) throw err;

                         for (const file of files) {
                           fs.unlink(path.join(productionoutput_path, file), err => {
                             if (err) throw err;
                           });
                         }
                       });
                       //step3 delete from directory

                     },1000);

                   },1000);

                   io.sockets.in(data.email).emit('deleteFiles', {msg: 'test_message'});

              });



        });


};
