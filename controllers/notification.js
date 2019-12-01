var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var notificationModel = require("../models/notificationModel.js");
var notificationBox = require("../models/notificationBox.js");
var serviceTasks = require("../models/serviceTasks.js");
var nodemailer = require('nodemailer');
var Storage = require('node-storage');
var store = new Storage('./store/store.js');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('checkNewMessage', function (data) {

                   socket.join(data.email);

                   multiple_db.query('SELECT fromEmail,toEmail FROM Messages WHERE toEmail = ? AND read_status = ? ORDER BY id DESC', [data.email,0], function (error, resultstthree, fields) {

                        if(resultstthree){
                          if(resultstthree.length > 0){
                            io.sockets.to(data.email).emit('checkNewMessage', {count: resultstthree.length});
                          }
                        }

                   });

              });


              socket.on('setFirebaseToken', function (data) {

                   socket.join(data.email);
                   var token = data.token;

                   multiple_db.query('UPDATE users SET firebaseToken = ? WHERE email = ?', [token,data.email], function (error, results, fields) {

                     if(results.changedRows == 1){
                       update_record = 1;
                     }

                     io.sockets.to(data.email).emit('setFirebaseToken', {status:"ok"});

                   });


              });


              socket.on('setWebFirebaseToken', function (data) {

                   socket.join(data.email);
                   var token = data.token;

                   multiple_db.query('UPDATE users SET webtoken = ? WHERE email = ?', [token,data.email], function (error, results, fields) {

                     io.sockets.to(data.email).emit('setWebFirebaseToken', {status:"ok"});

                   });


              });

              socket.on('sendMail', function (data) {

                   socket.join(data.email);

                   multiple_db.query('UPDATE users SET send_email_status = ?;SELECT * FROM `EmailTasks` ORDER BY id DESC LIMIT 1', [1], function (error, results, fields) {

                     //console.log(results[1][0].data);
                     notificationBox.sendAllHyper(results[1][0].title,results[1][0].data,results[1][0].clean_data);
                     //sendFPMtoTopicAndroid("breaking news",results[1][0].data);

                     io.sockets.to(data.email).emit('sendMail', {status:"ok"});

                   });


              });


              socket.on('subscribeToTopic', function (data) {

                   socket.join(data.email);

                   var token = data.token;
                   var topicName = data.topicName;

                     subscribeTopic(topicName,token);//topicName,token

                     io.sockets.to(data.email).emit('subscribeToTopic', {status:"ok"});


              });


              socket.on('unsubscribeToTopic', function (data) {

                   socket.join(data.email);

                   var token = data.token;
                   var topicName = data.topicName;

                     unsubscribeTopic(topicName,token);//topicName,token

                     io.sockets.to(data.email).emit('unsubscribeToTopic', {status:"ok"});

              });


              const sendFirebasetoSingleAndroid = async () => {
                   await notificationModel.sendFPMtoSingle("2clickorg@gmail.com","title test from server","body test from server","dop1 from server","dop2 from server").then(function(result) {

                      console.log(result);

                  });
              };

              const sendFPMtoAllUsersAndroid = async () => {
                   await notificationModel.sendFPMtoAllUsers("title test from server","body test from server","dop1 from server","dop2 from server").then(function(result) {

                      console.log(result);

                  });
              };

              //webfirebase

              const sendWebFirebasetoSingle = async () => {
                   await notificationModel.sendWebFPMtoSingle("2clickorg@gmail.com","title test from server","body test from server","http://localhost:8100/investor").then(function(result) {

                      console.log(result);

                  });
              };

              const sendWebFPMtoAllUsers = async () => {
                   await notificationModel.sendWebFPMtoAllUsers("title test from server","body test from server","http://localhost:8100/investor").then(function(result) {

                      console.log(result);

                  });
              };

              //webfirebase

              const sendFPMtoTopicAndroid = async (title,body) => {
                   await notificationModel.sendFPMtoTopic("2click",title,body,"dop1 from server","dop2 from server").then(function(result) {

                      console.log(result);

                  });
              };


              const subscribeTopic = async (topicName,token) => {
                   await notificationModel.subscribeTopic(topicName,token).then(function(result) {

                      console.log(result);

                  });
              };


              const unsubscribeTopic = async (topicName,token) => {
                   await notificationModel.unsubscribeTopic(topicName,token).then(function(result) {

                      console.log(result);

                  });
              };





        });

        const sendMessage = async (title,htmldata,sendemail,frommail) => {
             await notificationModel.sendMessage(title,htmldata,sendemail,frommail).then(function(result) {

                console.log(result.response);

            });
        };


        //notificationBox.sendAllHyper(results[1][0].title,results[1][0].data,results[1][0].clean_data);
        //notificationBox.sendHyperSingle("new message from","test message","test message","astana7777777@gmail.com","bbb@gmail.com");
        //notificationBox.sendFollowedCommentAllHyper("test message","Требуется рабочий на птицефабрику","Требуется рабочий на птицефабрику");
        //notificationBox.sendFollowedUserSingleHyper("test message","Требуется рабочий на птицефабрику","Требуется рабочий на птицефабрику","astana7777777@gmail.com");
        //sendMessage("new message from","<h3>hello can you buy car for 14000?</h3>","astana7777777@gmail.com","bbb@gmail.com");
        //sendFirebasetoSingle();
        //sendFPMtoAllUsers();
        //sendFPMtoTopic();
        //sendWebFirebasetoSingle();
        //sendWebFPMtoAllUsers();

        setInterval(function(){


          var date = timeconverter.getCurrentDate();

          var memeryCurrentDate = store.get('currentDate');

          if(memeryCurrentDate){
            if(memeryCurrentDate != date){
              //do something
              serviceTasks.turnOnDailyMailing();
              store.put('currentDate', date);
            }
          }else{
            store.put('currentDate', date);
          }


        },60000);


};
