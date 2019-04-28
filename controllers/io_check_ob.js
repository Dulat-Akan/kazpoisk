var db = require('../config/db.js');

var db_multiple = require('../config/multiple_mysql.js');

var timeconverter = require("../models/timeconverter.js");
const mysql = require('mysql2/promise');


//proverka nahozhdeniya polzovatelya dlya doveriya


module.exports = function(io){

      io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('disconnect', function(){
          console.log('user disconnected');
        });



            socket.on('check_ob', function (data) {

              //{email: sendemail,phone:phone,deviceid:checkdeviceid}
              socket.join(data.email); // We are using room of socket io

              var phone = data.phone;
              var email = data.email;
              var deviceid = data.deviceid;
              var checkfind = 0;



              var starttime = timeconverter.getDateStart();
              var endtime = timeconverter.getDateFinish();

              var limit = 3;
              var check_limit = 0;
              var datelimit = 3;
              var datecheck_limit = 0;
              var check_more_obyav = 0;
              var emptyob = 0;
              var doverie = 0;

              var enable_gold_status = 0;
              var enable_premium_status = 0;
              var enable_classic_status = 0;
              var enable_quick_status = 0;
              var enable_easy_status = 0;

              var count_gold_status = 0;
              var count_premium_status = 0;
              var count_classic_status = 0;
              var count_quick_status = 0;
              var count_easy_status = 0;

              //starttime + ' AND date < ' + endtime
              //console.log(starttime);
              //console.log(endtime);
              //1554955199.999
              //1554900000
              //io.sockets.in(email).emit('check_ob_action', {msg: 'test',rows:rows});
              //date < ' + endtime + ' AND
              //AND date < ' + endtime + '
                                          //0                                     //1                                                       //2                                                                           //3                                                                                                                           //4                                                                   //5                                                                             //6
              db_multiple.query('SELECT * FROM `appparams`; SELECT * FROM `users` WHERE email =\'' + email + '\' LIMIT 1;SELECT * FROM `users` WHERE device_id =\'' + deviceid + '\' LIMIT 1;SELECT * FROM `obinfo` WHERE date > ' + starttime + ' AND date IS NOT NULL AND email = \'' + email + '\' ORDER BY id DESC LIMIT 20;SELECT * FROM `obinfo` WHERE email =\'' + email + '\' ORDER BY id DESC LIMIT 20;SELECT * FROM `obinfo` WHERE device_id =\'' + deviceid + '\' ORDER BY id DESC LIMIT 20;SELECT * FROM `obinfo` WHERE date > ' + starttime + '  AND date IS NOT NULL AND device_id =\'' + deviceid + '\' ORDER BY id DESC LIMIT 20;', function (error, results, fields) {
                      if (error) throw error;

                      //appparams
                      limit = results[0][0].limit_ob;
                      datelimit = results[0][0].datelimit;
                      //appparams

                      //users //checkcash//check blockuser //check doverie
                      var checkblockuser = 0;
                      var check_cash = 0;
                      //users //checkcash//check blockuser //check doverie

                      //users //checkcash//check blockuser //check doverie
                      if(results[1].length > 0){

                          if(results[1][0].doverie == "1"){
                            doverie = 1;
                          }

                          enable_gold_status = results[1][0].enable_gold_status;
                          enable_premium_status = results[1][0].enable_premium_status;
                          enable_classic_status = results[1][0].enable_classic_status;
                          enable_quick_status = results[1][0].enable_quick_status;
                          enable_easy_status = results[1][0].enable_easy_status;

                          count_gold_status = results[1][0].count_gold_status;
                          count_premium_status = results[1][0].count_premium_status;
                          count_classic_status = results[1][0].count_classic_status;
                          count_quick_status = results[1][0].count_quick_status;
                          count_easy_status = results[1][0].count_easy_status;

                          if(results[1][0].enable_cash == "1"){
                              check_cash = 1;
                          }

                          if(results[1][0].blocked_user == "1"){
                            checkblockuser = 1;
                          }
                      }

                      //2 request check
                      if(results[2].length > 0){

                          if(results[2][0].doverie == "1"){
                            doverie = 1;
                          }

                          enable_gold_status = results[2][0].enable_gold_status;
                          enable_premium_status = results[2][0].enable_premium_status;
                          enable_classic_status = results[2][0].enable_classic_status;
                          enable_quick_status = results[2][0].enable_quick_status;
                          enable_easy_status = results[2][0].enable_easy_status;

                          count_gold_status = results[2][0].count_gold_status;
                          count_premium_status = results[2][0].count_premium_status;
                          count_classic_status = results[2][0].count_classic_status;
                          count_quick_status = results[2][0].count_quick_status;
                          count_easy_status = results[2][0].count_easy_status;

                          if(results[2][0].enable_cash == "1"){
                              check_cash = 1;
                          }

                          if(results[2][0].blocked_user == "1"){
                            checkblockuser = 1;

                          }
                      }

                      //2 request check
                      //users

                      //check limit datelimit obyav
                      if(results[3].length >= datelimit){
                        datecheck_limit = 1;
                        //console.log("1");
                      }

                      if(results[6].length >= datelimit){
                        datecheck_limit = 1;
                        //console.log("2");
                      }
                      //check limit obyav

                      //check_more_obyav
                      if(results[4].length >= limit){
                        check_limit = 1;
                      }

                      if(results[5].length >= limit){
                        check_limit = 1;
                      }
                      //check_more_obyav

                      //doverie 0/1
                      //checkblockuser 0/1
                      //check_cash 0/1
                      //datecheck_limit 0/1 datelimit
                      //check_limit 0/1 check_limit

                      io.sockets.in(email).emit('check_ob_action', {msg:'ok',doverie:doverie,checkblockuser:checkblockuser,check_cash:check_cash,datecheck_limit:datecheck_limit,check_limit:check_limit,enable_gold_status:enable_gold_status,enable_premium_status:enable_premium_status,enable_classic_status:enable_classic_status,enable_quick_status:enable_quick_status,enable_easy_status:enable_easy_status,count_gold_status:count_gold_status,count_premium_status:count_premium_status,count_classic_status:count_classic_status,count_quick_status:count_quick_status,count_easy_status:count_easy_status});
                    });



              if(phone.length == 14){

                    var newphone = "";

                    if(phone[1] == "8"){

                      for(var i = 0;i < phone.length;i++){

                          var replace = phone[i];

                          if(i == 1){
                            replace = "7";
                          }

                            newphone += replace;

                        }

                        phone = newphone;

                    }

                    var findphone_check_limit = 0;
                    var findphone_datelimit = 0;

                    db_multiple.query('SELECT * FROM `obinfo` WHERE telephone =\'' + phone + '\';SELECT * FROM `obinfo` WHERE date >= ' + starttime + ' AND date <= ' + endtime + ' AND telephone = \'' + phone + '\'', function (error, results, fields) {
                          if (error) throw error;
                          // `results` is an array with one element for every statement in the query:
                          if(results[0].length > limit){
                            findphone_check_limit = 1;
                          }


                          if(results[1].length >= datelimit){
                            findphone_datelimit = 1;
                          }

                          io.sockets.in(email).emit('check_ob_action', {msg: 'findphone_check_limit',findphone_check_limit:findphone_check_limit,findphone_datelimit: findphone_datelimit});
                        });







              }





            });

      });

};
