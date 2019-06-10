var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('googleAuth', function (data) {

                var device = data.device;

                var email = data.email;
                var name = data.name;
                var image_url = data.image_url;
                var role = 2;

                socket.join(device);

                db_multiple.query('SELECT * FROM `users` WHERE `email` = ? LIMIT 1', [email], function (error, results, fields) {

                  //console.log(results);

                  if(results.length > 0){

                        //console.log(results);
                        role = results[0].role;

                        var data = {
                          user:"olduser",
                          email:email,
                          role:role,
                          image_url:image_url
                        }

                        io.sockets.to(device).emit('googleAuth',data);



                      }else{

                        var insertdata  = {first_name: name,email: email,image_url:image_url};

                        var query = db_multiple.query('INSERT INTO users SET ?', insertdata, function (error, results, fields) {

                          io.sockets.to(device).emit('googleAuth',{user:"newuser",email:email,role:role,image_url:image_url} );

                        });


                      }



                    });






              });




        });


};
