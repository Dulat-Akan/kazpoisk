var moment = require('moment-timezone');
var request = require('request');
var Storage = require('node-storage');
var store = new Storage('./store/store.js');
var multiple_db = require('../config/multiple_mysql.js');
var nodemailer = require('nodemailer');
var db_multiple = require('../config/multiple_mysql.js');


var admin = require('firebase-admin');
var serviceAccount = require('../store/fire.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://click-f1304.firebaseio.com"
});
//store.put('zapros', '2');
//var ball_store = store.get('ball_id');
//var liveurl = 'https://api.paypal.com'; //live

module.exports = {

  sendMessage:async function(title,message,toUser,fromUser){

    return new Promise(function(resolve, reject) {
      //promise

          // var mailOptions = {
          //     from: 'info@2click.org',
          //     to: toUser,
          //     subject: title,
          //     text: message,
          //     html: message
          // }
          //
          // var transporter = nodemailer.createTransport({
          //     service: 'gmail',
          //     auth: {
          //       user: '2clickorg@gmail.com',
          //       pass: 'googlehack7777'
          //     }
          //   });
          //
          //   transporter.sendMail(mailOptions, function (err, res) {
          //       if(err){
          //           console.log(res);
          //           console.log(err);
          //       } else {
          //
          //       }
          //   })

          multiple_db.query('SELECT * FROM `users` WHERE `email` = ? AND send_message_status = ?', [toUser, 1], function (error, results, fields) {

            if(results.length > 0){

              //send message here
              var options = {
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                     url: 'https://kazpoisk.kz/public_control/sendSingleMessage',
                     method: 'POST',
                     body:"toUser=" + toUser + "&fromUser=" + fromUser + "&title="+ title +"&message=" + message
                   };

                   request(options, function (error, response, body) {
                     if (!error && response.statusCode == 200) {
                       console.log(body);
                     }else{
                      // console.log(error);
                     }
                   });

                    multiple_db.query('UPDATE users SET send_message_status = ? WHERE email = ?', [2,toUser], function (error, results, fields) {

                    });

                }


              });



            resolve("ok");
       //promise
     });


  },

     sendToAllMessage:async function(title,message){

       return new Promise(function(resolve, reject) {
         //promise

          // for(var i = 0;i < UserArray.length;i++){
          //
          //
          //   var mailOptions = {
          //       from: 'info@2click.org',
          //       to: UserArray[i],
          //       subject: title,
          //       text: message,
          //       html: message
          //   }
          //
          //   var transporter = nodemailer.createTransport({
          //       service: 'gmail',
          //       auth: {
          //         user: '2clickorg@gmail.com',
          //         pass: 'googlehack7777'
          //       }
          //     });
          //
          //     transporter.sendMail(mailOptions, function (err, res) {
          //         if(err){
          //             //console.log(err);
          //             console.log(err);
          //         } else {
          //           //console.log(res);
          //
          //         }
          //     });
          //
          // }

          request.get({url:'https://kazpoisk.kz/public_control/sendmasmessages'}, function(err,httpResponse,body){

        					//console.log(body);

        				 })


          resolve("ok");

          //promise
        });


    },

    sendToFollowedCommentAllMessage:async function(title,message){

      return new Promise(function(resolve, reject) {
        //promise

         request.get({url:'https://kazpoisk.kz/public_control/sendmasFollowmessages'}, function(err,httpResponse,body){

                 console.log(body);

                })


         resolve("ok");

         //promise
       });


   },

   sendToFollowedUserSingleMessage:async function(title,message,fromUser){

       return new Promise(function(resolve, reject) {
         //promise

                 var options = {
                       headers: {'content-type' : 'application/x-www-form-urlencoded'},
                        url: 'https://kazpoisk.kz/public_control/sendmasFollowUserSingles',
                        method: 'POST',
                        body:"fromUser=" + fromUser
                      };

                      request(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                          console.log(body);
                        }else{
                         // console.log(error);
                        }
                      });


          resolve("ok");

          //promise
        });


    },


     sendFPMtoSingle:async function(sendemail,title,body,dopmessageone,dopmessagetwo){

       return new Promise(function(resolve, reject) {
         //promise

         multiple_db.query('SELECT * FROM `users` WHERE `email` = ?', [sendemail], function (error, results, fields) {

           if(results.length > 0){

                    var registrationToken = '';

                        if(results[0].firebaseToken != "not"){
                          registrationToken = results[0].firebaseToken;
                        }else{
                          resolve("not token");
                          return false;
                        }

                    var message = {
                            notification:{
                              title:title,
                              body:body
                            },
                             data: {
                               variableone: dopmessageone,
                               variabletwo: dopmessagetwo
                             },
                             token: registrationToken
                           };

                           admin.messaging().send(message)
                             .then((response) => {
                               // Response is a message ID string.
                               resolve(response);
                               console.log('Successfully sent message:', response);
                             })
                             .catch((error) => {
                               console.log('Error sending message:', error);
                             });


               }

             });





          //promise
        });

    },


     sendFPMtoAllUsers:async function(title,body,dopmessageone,dopmessagetwo){

       return new Promise(function(resolve, reject) {
         //promise

         multiple_db.query('SELECT * FROM `users`', function (error, results, fields) {

           if(results.length > 0){

                    var registrationToken = new Array();

                    for(var i = 0;i < results.length;i++){
                        //not
                        if(results[i].firebaseToken != "not"){
                          registrationToken.push(results[i].firebaseToken);
                        }

                    }

                    var message = {
                            notification:{
                              title:title,
                              body:body
                            },
                             data: {
                               variableone: dopmessageone,
                               variabletwo: dopmessagetwo
                             },
                             tokens: registrationToken
                           };

                           admin.messaging().sendMulticast(message)
                             .then((response) => {
                               // Response is a message ID string.
                               resolve(response);
                               console.log('Successfully sent message:', response);
                             })
                             .catch((error) => {
                               console.log('Error sending message:', error);
                             });


               }

             });





          //promise
        });

    },

    sendFPMtoFollowUsers:async function(title,body,dopmessageone,dopmessagetwo,fromUser){

      return new Promise(function(resolve, reject) {
        //promise

        const anAsyncFunction = async item => { //a function that returns a promise
          return new Promise(function(resolve, reject) {

            multiple_db.query('SELECT firebaseToken,webtoken FROM users WHERE email = ?',[item], function (error, results, fields) {

              if(results.length > 0){
                   resolve(results);
                  }

                });

          });
        }

        new Promise(function(resolve, reject) {

          multiple_db.query('SELECT * FROM `follow` WHERE user_email = ?',[fromUser], function (error, results, fields){

              resolve(results);

          });

         }).then(function(results) {

                  //console.log(results[0].email);
                  const getData = async () => {

                        return await Promise.all(results.map(item => anAsyncFunction(item.email)))

                      }

                      const data = getData();

                      return data;

               }).then(function(result) {

                 var tokenArray = new Array();

                 for(var i = 0;i < result.length;i++){

                    if(result[i][0].firebaseToken != "not"){
                      tokenArray.push(result[i][0].firebaseToken);
                    }else if(result[i][0].webtoken != "not"){
                      tokenArray.push(result[i][0].webtoken);
                    }
                 }


                 if(tokenArray.length > 0){

                       var message = {
                               notification:{
                                 title:title,
                                 body:body
                               },
                                data: {
                                  variableone: dopmessageone,
                                  variabletwo: dopmessagetwo
                                },
                                tokens: tokenArray
                              };

                              admin.messaging().sendMulticast(message)
                                .then((response) => {
                                  // Response is a message ID string.
                                  resolve(response);
                                  console.log('Successfully sent message:', response);
                                })
                                .catch((error) => {
                                  console.log('Error sending message:', error);
                                });

                          }else{

                          }

               });




         //promise
       });

   },


     sendWebFPMtoSingle:async function(sendemail,title,body,url){

       return new Promise(function(resolve, reject) {
         //promise

         multiple_db.query('SELECT * FROM `users` WHERE `email` = ?', [sendemail], function (error, results, fields) {

           if(results.length > 0){

                    var registrationToken = '';

                        if(results[0].webtoken != "not"){
                          registrationToken = results[0].webtoken;
                        }else{
                          resolve("not token");
                          return false;
                        }



                    var message = {
                            notification:{
                              title:title,
                              body:body
                            },
                            webpush: {
                                fcm_options: {
                                  link: url
                                }
                              },

                             token: registrationToken
                           };

                           admin.messaging().send(message)
                             .then((response) => {
                               // Response is a message ID string.
                               resolve(response);
                               console.log('Successfully sent message:', response);
                             })
                             .catch((error) => {
                               console.log('Error sending message:', error);
                             });


               }

             });





          //promise
        });

    },


     sendWebFPMtoAllUsers:async function(title,body,url){

       return new Promise(function(resolve, reject) {
         //promise

         multiple_db.query('SELECT * FROM `users`', function (error, results, fields) {

           if(results.length > 0){

                    var registrationToken = new Array();

                    for(var i = 0;i < results.length;i++){
                        //not
                        if(results[i].webtoken != "not"){
                          registrationToken.push(results[i].webtoken);
                        }

                    }

                    var message = {
                            notification:{
                              title:title,
                              body:body
                            },
                            webpush: {
                                fcm_options: {
                                  link: url
                                }
                              },
                             tokens: registrationToken
                           };

                           admin.messaging().sendMulticast(message)
                             .then((response) => {
                               // Response is a message ID string.
                               resolve(response);
                               console.log('Successfully sent message:', response);
                             })
                             .catch((error) => {
                               console.log('Error sending message:', error);
                             });


               }

             });





          //promise
        });

    },


     sendFPMtoTopic:async function(topicName,title,body,dopmessageone,dopmessagetwo){

       return new Promise(function(resolve, reject) {
         //promise

                    var message = {
                            notification:{
                              title:title,
                              body:body
                            },
                             data: {
                               variableone: dopmessageone,
                               variabletwo: dopmessagetwo
                             },
                             topic: topicName
                           };

                           admin.messaging().send(message)
                             .then((response) => {
                               // Response is a message ID string.
                               resolve(response);
                               console.log('Successfully sent message:', response);
                             })
                             .catch((error) => {
                               console.log('Error sending message:', error);
                             });



          //promise
        });

    },

    subscribeTopic:async function(topicName,token){

      return new Promise(function(resolve, reject) {
        //promise
        var registrationTokens = [token];

        admin.messaging().subscribeToTopic(registrationTokens, topicName)
            .then(function(response) {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log('Successfully subscribed to topic:', response);
            resolve(response);
            })
            .catch(function(error) {
            console.log('Error subscribing to topic:', error);
            });
         //promise
       });

   },

   unsubscribeTopic:async function(topicName,token){

       return new Promise(function(resolve, reject) {
         //promise
            var registrationTokens = [token];

             admin.messaging().unsubscribeFromTopic(registrationTokens, topicName)
               .then(function(response) {
                 // See the MessagingTopicManagementResponse reference documentation
                 // for the contents of response.
                 console.log('Successfully unsubscribed from topic:', response);
                 resolve(response);
               })
               .catch(function(error) {
                 console.log('Error unsubscribing from topic:', error);
               });


               });


        }


}
