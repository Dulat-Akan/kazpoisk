var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
var timeconverter = require('../models/timeconverter.js');
var Serialize = require('php-serialize')

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getContacts', function (data){

                console.log("check");

                   socket.join(data.email);

                   var not_same_array = new Array();
                   db_multiple.query('SELECT chat.id,chat.date,chat.message, chat.fromUser,chat.toUser, chat.image_url,chat.name,chat.online,chat.status FROM chat WHERE chat.fromUser = ? OR chat.toUser = ? ORDER BY id DESC', [data.email,data.email], function (error, results, fields) {


                     if(results){

                        if(results.length > 0){

                           //filtration the same from 1 people
                           for(var i = 0;i < results.length;i++){

                             if(not_same_array.length > 0){

                               var fix = 0;
                               for(var j = 0;j < not_same_array.length;j++){
                                   if(((not_same_array[j].toUser == results[i].toUser) && (not_same_array[j].fromUser == results[i].fromUser)) || (not_same_array[j].fromUser == results[i].toUser)){

                                     fix = 1;

                                   }
                               }

                               if(fix == 0){

                                 if(data.email != results[i].toEmail){
                                   results[i].date = timeconverter.timeConverter_us_time(results[i].date); //date convertiong function
                                   results[i].count = 0;
                                   not_same_array.push(results[i]);
                                 }

                               }
                             }else{
                               results[i].date = timeconverter.timeConverter_us_time(results[i].date); //date convertiong function
                               results[i].count = 0;
                               not_same_array.push(results[i]);
                             }

                           }


                           //filtration the same

                             //counting
                                 db_multiple.query('SELECT fromUser,toUser FROM chat WHERE toUser = ? AND status = ? ORDER BY id DESC', [data.email,0], function (error, resultstthree, fields) {

                                     for(var p = 0;p < not_same_array.length;p++){
                                       for(var o = 0;o < resultstthree.length;o++){
                                         if((not_same_array[p].toUser == resultstthree[o].toUser) && (not_same_array[p].fromUser == resultstthree[o].fromUser)){
                                             not_same_array[p].count += 1;
                                         }
                                       }
                                     }



                                     io.sockets.to(data.email).emit('getContacts', {data: not_same_array});

                                 });
                               //counting



                           }




                       }


                       });



              });




              socket.on('setUserContacts', function (data) {

                   socket.join(data.email);

                   var array = data.array;
                   var email = data.email;

                   if(data.action == "checkstatus"){

                     db_multiple.query('SELECT `contactstatus` FROM `users` WHERE `email` = ? LIMIT 1', [email], function (error, results, fields) {

                       var checkingstatus = 0;
                       if(results.length > 0){
                              checkingstatus = results[0].contactstatus;
                           }

                           if(checkingstatus == 0){
                             io.sockets.in(data.email).emit('setUserContacts', {action: 'checkstatus',status:'0'});
                           }else{
                             io.sockets.in(data.email).emit('setUserContacts', {action: 'checkstatus',status:'1'});
                           }


                         });

                   }else if(data.action == "setcontacts"){

                        const serialized = Serialize.serialize(array);

                     db_multiple.query('UPDATE users SET contacts = ?,contactstatus = ? WHERE email = ?', [serialized, 1, email], function (error, results, fields) {

                        io.sockets.in(data.email).emit('setUserContacts', {action: 'setcontacts',status:'1'});

                     });

                   }





              });





        });


};
