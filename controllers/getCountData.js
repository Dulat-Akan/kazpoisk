var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
var PHPUnserialize = require('php-unserialize');
var formHelper = require("../models/formHelper.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getCountData', function (data) {

                   socket.join(data.email);

                   var startcount = Number(data.startcount);
               		 var pagesum = Number(data.pagesum);
                   var searchtype = data.searchType;
                   var searchSqlrequest = data.searchSqlrequest;
                   var searchstring = formHelper.cleanString(data.searchstring);
                   var latestid = 0;

                   if(searchtype == "usually"){

                       db_multiple.query("SELECT * FROM `obinfo` WHERE `status` != 'no' AND `status` != 'deleted' AND `id` < ? ORDER BY priority DESC, `id` DESC LIMIT ?",[startcount, pagesum], function (error, results, fields) {
                         if (error) throw error;

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

                             latestid = results[i].id;

                         }
                       // connected!

                       io.sockets.in(data.email).emit('getCountData', {data: results,latestid:latestid});

                       });

                   }else if(searchtype == "filter"){

                     var onepart_request = "";
                     var twopart_request = "";
                     var add_to_part_string = " AND `id` < " + startcount + " ";
                     var fullrequest = "";

                     var fixpart = 0;

                     for(var u = 0;u < searchSqlrequest.length;u++){
                        if((searchSqlrequest[u] == "O") && (searchSqlrequest[u + 1] == "R")){
                          fixpart = 1;
                        }

                        if(fixpart == 0){
                          onepart_request += searchSqlrequest[u];
                        }else{
                          twopart_request += searchSqlrequest[u];
                        }

                     }

                     twopart_request = twopart_request.replace("40", pagesum);

                     console.log(onepart_request + "|" + add_to_part_string + "|" + twopart_request);
                     fullrequest = onepart_request + add_to_part_string + twopart_request;

                     db_multiple.query(fullrequest, function (error, results, fields) {
                       if (error) throw error;

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

                           latestid = results[i].id;

                       }
                     // connected!

                     io.sockets.in(data.email).emit('getCountData', {data: results,latestid:latestid});

                     });

                   }else if(searchtype == "input"){
                        //searchstring
                        //SELECT * FROM `obinfo` WHERE `zagolovok` LIKE '%" + searchstring + "%' OR `opisanie` LIKE '%" + searchstring + "%' AND `status` != 'no' AND `status` != 'deleted' ORDER BY priority DESC, `id` DESC LIMIT 40
                        db_multiple.query("SELECT * FROM `obinfo` WHERE ((`zagolovok` LIKE '%" + searchstring + "%') OR (`opisanie` LIKE '%" + searchstring + "%')) AND (`status` != 'no') AND (`status` != 'deleted') AND (`id` < " + startcount + ") ORDER BY priority DESC, `id` DESC LIMIT " + pagesum, function (error, results, fields) {
                          if (error) throw error;

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

                              latestid = results[i].id;

                          }
                        // connected!

                        io.sockets.in(data.email).emit('getCountData', {data: results,latestid:latestid});

                        });

                   }



              });

              socket.on('getStringData', function (data) {

                  socket.join(data.email);

                  var searchstring = formHelper.cleanString(data.searchstring);

                  console.log(searchstring);

                  var sql = "SELECT * FROM `obinfo` WHERE ((`zagolovok` LIKE '%" + searchstring + "%') OR (`opisanie` LIKE '%" + searchstring + "%')) AND (`status` != 'no') AND (`status` != 'deleted') ORDER BY priority DESC, `id` DESC LIMIT 40";

                  var latestid = 0;

                    db_multiple.query(sql, function (error, results, fields) {
                      if (error) throw error;

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

                          latestid = results[i].id;

                      }
                    // connected!

                      io.sockets.in(data.email).emit('getStringData', {data: results,latestid:latestid});

                    });

              });



        });


};
