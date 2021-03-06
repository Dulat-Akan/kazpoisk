var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
var PHPUnserialize = require('php-unserialize');
var formHelper = require("../models/formHelper.js");
var timeconverter = require("../models/timeconverter.js");
var notificationBox = require("../models/notificationBox.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('userDetailService', function (data) {

                   socket.join(data.email);

                   var action = data.action;
                   var id = data.id;
                   var unix_time = new Date().getTime();

                   if(action == "follow"){

                     db_multiple.query("SELECT * FROM `follow` WHERE `email` = ? AND `user_email` = ? LIMIT 1;",[data.email, data.remail], function (error, results, fields) {
                       if (error) throw error;

                       if(results.length < 1){

                         var insert  = { email: data.email,user_email:data.remail,unixtime:unix_time};

                         var query = db_multiple.query('INSERT INTO follow SET ?', insert, function (error, results, fields) {

                             io.sockets.in(data.email).emit('userDetailService', {action:"follow",status:"followed"});

                         });

                       }else{
                         db_multiple.query('DELETE FROM follow WHERE `email` = ? AND `user_email` = ?',[data.email,data.remail], function (error, results, fields) {
                           io.sockets.in(data.email).emit('userDetailService', {action:"follow",status:"unfollowed"});
                         })
                       }

                     });

                   }else if(action == "favorite"){

                     db_multiple.query("SELECT * FROM `favorite` WHERE `email` = ? AND `ob_id` = ? LIMIT 1;",[data.email, id], function (error, results, fields) {
                       if (error) throw error;

                       if(results.length < 1){

                         var insert  = { email: data.email,ob_id:id,unixtime:unix_time};

                         var query = db_multiple.query('INSERT INTO favorite SET ?', insert, function (error, results, fields) {

                             io.sockets.in(data.email).emit('userDetailService', {action:"favorite",status:"on"});

                         });

                       }else{
                         db_multiple.query('DELETE FROM favorite WHERE `email` = ? AND `ob_id` = ?',[data.email,id], function (error, results, fields) {
                           io.sockets.in(data.email).emit('userDetailService', {action:"favorite",status:"off"});
                         })
                       }

                     });

                   }else if(action == "checkstatus"){

                     var checkfollow = 0;
                     var checkfavorite = 0;

                     db_multiple.query("SELECT * FROM `follow` WHERE `email` = ? AND `user_email` = ? LIMIT 1;SELECT * FROM `favorite` WHERE `email` = ? AND `ob_id` = ? LIMIT 1;",[data.email, data.remail,data.email, id], function (error, results, fields) {

                       if(results[0].length > 0){
                         checkfollow = 1;
                       }
                       if(results[1].length > 0){
                         checkfavorite = 1;
                       }

                       io.sockets.in(data.email).emit('userDetailService', {action:"checkstatus",followstatus:checkfollow,favoritestatus:checkfavorite});
                     });


                   }else if(action == "followComment"){

                     db_multiple.query("SELECT * FROM `follow` WHERE `email` = ? AND `user_email` = ? LIMIT 1;",[data.email, data.remail], function (error, results, fields) {
                       if (error) throw error;

                       if(results.length < 1){

                         var insert  = { email: data.email,user_email:data.remail,unixtime:unix_time};

                         var query = db_multiple.query('INSERT INTO follow SET ?', insert, function (error, results, fields) {

                             io.sockets.in(data.email).emit('userDetailService', {action:"followComment",status:"followed"});

                         });

                       }else{
                         db_multiple.query('DELETE FROM follow WHERE `email` = ? AND `user_email` = ?',[data.email,data.remail], function (error, results, fields) {
                           io.sockets.in(data.email).emit('userDetailService', {action:"followComment",status:"unfollowed"});
                         })
                       }

                     });

                   }else if(action == "checkfollowComment"){

                       var checkfollow = 0;
                       var checkfavorite = 0;

                       db_multiple.query("SELECT * FROM `follow` WHERE `email` = ? AND `user_email` = ? LIMIT 1;SELECT * FROM `favorite` WHERE `email` = ? AND `ob_id` = ? LIMIT 1;",[data.email, data.remail,data.email, id], function (error, results, fields) {

                         if(results[0].length > 0){
                           checkfollow = 1;
                         }
                         if(results[1].length > 0){
                           checkfavorite = 1;
                         }

                         io.sockets.in(data.email).emit('userDetailService', {action:"checkfollowComment",followstatus:checkfollow,favoritestatus:checkfavorite});
                       });

                   }






              });

              socket.on('serviceComments', function (data) {

                  socket.join(data.email);

                  var id = data.id;

                  var action = data.action;

                  if(action == "checkComments"){

                    db_multiple.query('SELECT * FROM `comment` WHERE `comment_id` = ?', [id], function (error, results, fields) {

                      if(results.length > 0){

                              io.sockets.in(data.email).emit('serviceComments', {action:"checkComments",data:results});

                          }

                        });

                  }else if(action == "setComments"){
                    //email:myemail,toEmail:toEmail,toId:toId,text:text,avatar:avatar,name:name
                    var name = data.name;
                    var avatar = data.avatar;
                    var text = data.text;
                    var fromEmail = data.email;
                    var toEmail = data.toEmail;
                    var unixtime = new Date().getTime();

                    var insert  = {
                      comment_id: id,
                      com_name:name,
                      com_email:fromEmail,
                      com_text:text,
                      com_date:unixtime,
                      image_url:avatar,
                      toEmail:toEmail
                    };

                    var query = db_multiple.query('INSERT INTO comment SET ?', insert, function (error, results, fields) {

                      io.sockets.in(data.email).emit('serviceComments', {action:"setComments",status:"added"});

                    });

                  }





              });

              socket.on('publicRequest', function (data) {

                  socket.join(data.email);

                  //console.log("inserted");
                  var id = data.id;

                  var action = data.action;

                  if(action == "checkComments"){

                    db_multiple.query('SELECT * FROM `comment` WHERE `comment_id` = ? ORDER BY id DESC LIMIT 200', [id], function (error, results, fields) {

                      if(results.length > 0){

                              var newConvertedArray = new Array();

                              for(var j = 0;j < results.length;j++){
                                  var newtime = timeconverter.timeConverter_us_date_time(results[j].com_date);
                                  results[j].com_date = newtime;
                              }


                              io.sockets.emit('publicRequest', {action:"checkComments",data:results});

                          }

                        });

                  }else if(action == "setComments"){
                    //email:myemail,toEmail:toEmail,toId:toId,text:text,avatar:avatar,name:name
                    var name = data.name;
                    var avatar = data.avatar;
                    var text = data.text;
                    var fromEmail = data.email;
                    var toEmail = data.toEmail;
                    var unixtime = new Date().getTime();

                    var insert  = {
                      comment_id: id,
                      com_name:name,
                      com_email:fromEmail,
                      com_text:text,
                      com_date:unixtime,
                      image_url:avatar,
                      toEmail:toEmail
                    };

                    //console.log(insert);
                    notificationBox.sendFollowedCommentAllHyper("new request | новый запрос",text,text);

                    var query = db_multiple.query('INSERT INTO comment SET ?', insert, function (error, results, fields) {

                      io.sockets.in(data.email).emit('publicRequest', {action:"setComments",status:"added"});

                    });

                  }



              });




              socket.on('publicSubcomments', function (data) {

                  socket.join(data.email);

                  //console.log("inserted");
                  var id = data.id;

                  var action = data.action;

                  if(action == "checkComments"){

                    db_multiple.query('SELECT * FROM `comments_subcomments` WHERE `comments_subcomments_id` = ? ORDER BY id DESC LIMIT 200', [id], function (error, results, fields) {

                      if(results.length > 0){

                              var newConvertedArray = new Array();

                              for(var j = 0;j < results.length;j++){
                                  var newtime = timeconverter.timeConverter_us_date_time(results[j].com_date);
                                  results[j].com_date = newtime;
                              }


                              io.sockets.emit('publicSubcomments', {action:"checkComments",data:results});

                          }

                        });

                  }else if(action == "setComments"){
                    //email:myemail,toEmail:toEmail,toId:toId,text:text,avatar:avatar,name:name
                    var name = data.name;
                    var avatar = data.avatar;
                    var text = data.text;
                    var fromEmail = data.email;
                    var toEmail = data.toEmail;
                    var unixtime = new Date().getTime();

                    var insert  = {
                      comments_subcomments_id: id,
                      com_name:name,
                      com_email:fromEmail,
                      com_text:text,
                      com_date:unixtime,
                      image_url:avatar,
                      toEmail:toEmail
                    };

                    //console.log(insert);

                    var query = db_multiple.query('INSERT INTO comments_subcomments SET ?', insert, function (error, results, fields) {

                      //console.log(error);

                      io.sockets.in(data.email).emit('publicSubcomments', {action:"setComments",status:"added"});

                    });

                  }



              });

              socket.on('serviceMessages', function (data) {

                  socket.join(data.email);

                  var id = data.id;

                  var action = data.action;
                  var fromEmail = data.email;
                  var toEmail = data.toEmail;

                  if(action == "checkMessages"){

                    db_multiple.query('SELECT * FROM `chat` WHERE ((`fromUser` = ?) AND (`toUser` = ?)) OR ((`fromUser` = ?) AND (`toUser` = ?))', [fromEmail,toEmail,toEmail,fromEmail], function (error, results, fields) {

                      if(results.length > 0){

                        db_multiple.query('UPDATE chat SET status = ? WHERE fromUser = ? AND toUser = ?', [1,toEmail,fromEmail], function (error, results, fields) {

                        });

                          io.sockets.in(data.email).emit('serviceMessages', {action:"checkMessages",data:results});

                          }

                        });

                  }else if(action == "setMessages"){
                    //email:myemail,toEmail:toEmail,toId:toId,text:text,avatar:avatar,name:name
                    var name = data.name;
                    var avatar = data.avatar;
                    var text = data.text;
                    var unixtime = new Date().getTime();

                    var insert  = {
                      name:name,
                      fromUser:fromEmail,
                      message:text,
                      date:unixtime,
                      image_url:avatar,
                      toUser:toEmail
                    };
                    //send_message_status
                    //sendHyperSingle
                    notificationBox.sendHyperSingle("new message from",text,text,toEmail,fromEmail);
                    //sendMessage("new message from","<h3>hello can you buy car for 14000?</h3>","astana7777777@gmail.com","bbb@gmail.com");

                    var query = db_multiple.query('INSERT INTO chat SET ?', insert, function (error, results, fields) {

                      io.sockets.in(data.email).emit('serviceMessages', {action:"setMessages",status:"added",data:insert});
                      io.sockets.in(toEmail).emit('serviceMessages', {action:"newMessages",data:insert});

                    });

                  }





              });



        });


};
