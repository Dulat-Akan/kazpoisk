var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
var PHPUnserialize = require('php-unserialize');
var formHelper = require("../models/formHelper.js");


module.exports = function(io){




        io.on('connection', function(socket){


              socket.on('getSubscribers', function (data) {

                   socket.join(data.email);

                   var email = data.email;


                   const anAsyncFunction = async item => { //a function that returns a promise

                             return new Promise(function(resolve, reject) {

                                     db_multiple.query("SELECT * FROM `obinfo` WHERE `status` != 'no' AND `status` != 'deleted' AND `email` = ? ORDER BY priority DESC, `id` DESC LIMIT 40;", [item], function (error, results, fields) {

                                       if(results.length > 0){

                                         for(var i = 0;i < results.length;i++){

                                               if(results[i].photo_path != "n.jpg"){

                                                 var unserial = PHPUnserialize.unserialize(results[i].photo_path);

                                                 if(unserial){
                                                   results[i].photo_path = unserial;
                                                 }

                                               }

                                               if(results[i].video != "нет"){

                                                   var unserialvideo = PHPUnserialize.unserialize(results[i].video);

                                                   if(unserialvideo){
                                                        results[i].video = unserialvideo;
                                                     }

                                                 }

                                             }


                                             resolve(results);


                                           }

                                         });

                               });

                          }


                            var resultArray = new Array();

                            const promise1 = new Promise(function(resolve, reject) {

                              db_multiple.query('SELECT * FROM `follow` WHERE `email` = ?', [email], function (error, search, fields){

                                  resolve(search);

                              });

                             })

                            promise1.then(function(search) {

                              const getData = async () => {

                                    return await Promise.all(search.map(item => anAsyncFunction(item.user_email)))

                                  }

                                  const data = getData()
                                  //console.log(data);
                                  return data;

                                  }).then(function(counting_email) {

                                      for(var u = 0;u < counting_email.length;u++){

                                        for(var h = 0;h < counting_email[u].length;h++){
                                           var rx = counting_email[u][h];

                                           resultArray.push(rx);
                                        }

                                      }

                                      return resultArray;
                                  })
                                  // 3. print helpful messages about how the code in this section will be run
                                  // before the string is actually processed by the mocked asynchronous code in the
                                  // previous then block.
                                  .then(function(result) {
                                      //console.log(result.length);
                                      io.sockets.in(data.email).emit('getSubscribers', {data: result});
                                  });




              });


              socket.on('getSubscribersCount', function (data) {

                   socket.join(data.email);

                   var email = data.email;

                   var id = data.id;

                   const anAsyncFunction = async item => { //a function that returns a promise

                             return new Promise(function(resolve, reject) {

                                     db_multiple.query("SELECT * FROM `obinfo` WHERE `status` != 'no' AND `status` != 'deleted' AND `email` = ? AND `id` < ? ORDER BY priority DESC, `id` DESC LIMIT 40;", [item,id], function (error, results, fields) {

                                       if(results.length > 0){

                                         for(var i = 0;i < results.length;i++){

                                               if(results[i].photo_path != "n.jpg"){

                                                 var unserial = PHPUnserialize.unserialize(results[i].photo_path);

                                                 if(unserial){
                                                   results[i].photo_path = unserial;
                                                 }

                                               }

                                               if(results[i].video != "нет"){

                                                   var unserialvideo = PHPUnserialize.unserialize(results[i].video);

                                                   if(unserialvideo){
                                                        results[i].video = unserialvideo;
                                                     }

                                                 }

                                             }


                                             resolve(results);


                                           }

                                         });

                               });

                          }


                            var resultArray = new Array();

                            const promise1 = new Promise(function(resolve, reject) {

                              db_multiple.query('SELECT * FROM `follow` WHERE `email` = ?', [email], function (error, search, fields){

                                  resolve(search);

                              });

                             })

                            promise1.then(function(search) {

                              const getData = async () => {

                                    return await Promise.all(search.map(item => anAsyncFunction(item.user_email)))

                                  }

                                  const data = getData()
                                  //console.log(data);
                                  return data;

                                  }).then(function(counting_email) {

                                      for(var u = 0;u < counting_email.length;u++){

                                        for(var h = 0;h < counting_email[u].length;h++){
                                           var rx = counting_email[u][h];

                                           resultArray.push(rx);
                                        }

                                      }

                                      return resultArray;
                                  })
                                  // 3. print helpful messages about how the code in this section will be run
                                  // before the string is actually processed by the mocked asynchronous code in the
                                  // previous then block.
                                  .then(function(result) {
                                      //console.log(result.length);
                                      io.sockets.in(data.email).emit('getSubscribersCount', {data: result});
                                  });

              });



              socket.on('getFavorites', function (data) {

                   socket.join(data.email);

                   var email = data.email;


                   const anAsyncFunction = async item => { //a function that returns a promise

                             return new Promise(function(resolve, reject) {

                                     db_multiple.query("SELECT * FROM `obinfo` WHERE `status` != 'no' AND `status` != 'deleted' AND `id` = ? ORDER BY priority DESC, `id` DESC LIMIT 40;", [item], function (error, results, fields) {

                                       if(results.length > 0){

                                         for(var i = 0;i < results.length;i++){

                                               if(results[i].photo_path != "n.jpg"){

                                                 var unserial = PHPUnserialize.unserialize(results[i].photo_path);

                                                 if(unserial){
                                                   results[i].photo_path = unserial;
                                                 }

                                               }

                                               if(results[i].video != "нет"){

                                                   var unserialvideo = PHPUnserialize.unserialize(results[i].video);

                                                   if(unserialvideo){
                                                        results[i].video = unserialvideo;
                                                     }

                                                 }

                                             }


                                             resolve(results);


                                           }

                                         });

                               });

                          }


                            var resultArray = new Array();

                            const promise1 = new Promise(function(resolve, reject) {

                              db_multiple.query('SELECT * FROM `favorite` WHERE `email` = ?', [email], function (error, search, fields){

                                  //console.log(search);
                                  resolve(search);

                              });

                             })

                            promise1.then(function(search) {

                              const getData = async () => {

                                    return await Promise.all(search.map(item => anAsyncFunction(item.ob_id)))

                                  }

                                  const data = getData()
                                  //console.log(data);
                                  return data;

                                  }).then(function(counting_email) {

                                      for(var u = 0;u < counting_email.length;u++){

                                        for(var h = 0;h < counting_email[u].length;h++){
                                           var rx = counting_email[u][h];

                                           resultArray.push(rx);
                                        }

                                      }

                                      return resultArray;
                                  })
                                  // 3. print helpful messages about how the code in this section will be run
                                  // before the string is actually processed by the mocked asynchronous code in the
                                  // previous then block.
                                  .then(function(result) {
                                      //console.log(result.length);
                                      io.sockets.in(data.email).emit('getFavorites', {data: result});
                                  });




              });


              socket.on('getFavoritesCount', function (data) {

                   socket.join(data.email);

                   var email = data.email;

                   var id = data.id;

                   const anAsyncFunction = async item => { //a function that returns a promise

                             return new Promise(function(resolve, reject) {

                                     db_multiple.query("SELECT * FROM `obinfo` WHERE `status` != 'no' AND `status` != 'deleted' AND `id` = ? AND `id` < ? ORDER BY priority DESC, `id` DESC LIMIT 40;", [item,id], function (error, results, fields) {

                                       if(results.length > 0){

                                         for(var i = 0;i < results.length;i++){

                                               if(results[i].photo_path != "n.jpg"){

                                                 var unserial = PHPUnserialize.unserialize(results[i].photo_path);

                                                 if(unserial){
                                                   results[i].photo_path = unserial;
                                                 }

                                               }

                                               if(results[i].video != "нет"){

                                                   var unserialvideo = PHPUnserialize.unserialize(results[i].video);

                                                   if(unserialvideo){
                                                        results[i].video = unserialvideo;
                                                     }

                                                 }

                                             }


                                             resolve(results);


                                           }

                                         });

                               });

                          }


                            var resultArray = new Array();

                            const promise1 = new Promise(function(resolve, reject) {

                              db_multiple.query('SELECT * FROM `favorite` WHERE `email` = ?', [email], function (error, search, fields){

                                  resolve(search);

                              });

                             })

                            promise1.then(function(search) {

                              const getData = async () => {

                                    return await Promise.all(search.map(item => anAsyncFunction(item.ob_id)))

                                  }

                                  const data = getData()
                                  //console.log(data);
                                  return data;

                                  }).then(function(counting_email) {

                                      for(var u = 0;u < counting_email.length;u++){

                                        for(var h = 0;h < counting_email[u].length;h++){
                                           var rx = counting_email[u][h];

                                           resultArray.push(rx);
                                        }

                                      }

                                      return resultArray;
                                  })
                                  // 3. print helpful messages about how the code in this section will be run
                                  // before the string is actually processed by the mocked asynchronous code in the
                                  // previous then block.
                                  .then(function(result) {
                                      //console.log(result.length);
                                      io.sockets.in(data.email).emit('getFavoritesCount', {data: result});
                                  });

              });



        });


};
