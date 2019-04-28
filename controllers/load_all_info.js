var db = require('../config/db.js');
var dbelectron = require('../config/dbelectron.js');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('load_all_info', function (data) {

                var device = data.device;
                var valyuta = data.valyuta;
                //1790276898823.3882
                //console.log(device);
                socket.join(device);

                var empty_ob_price = 0;
                var gold_price = 0;
                var premium_price = 0;
                var classic_price = 0;
                var quick_price = 0;
                var easy_price = 0;
                var valyuta_price_kzt = 0;

                var currency_ru = 0;

                //status = sending - razmesheno
                //no = moderator



                var automatic_publication_status = "";
                var empty_pod_text = "";
                var status_cash_text_status = "";
                var temp_status_text = "";

                dbelectron.query('SELECT * FROM `currency` ',
                    function(err, results, fields) {

                      currency_ru = results[0].ru_kzt_russia;

                    }
                );


                db.query('SELECT * FROM `appparams` ',
                    function(err, results, fields) {


                      empty_pod_text = results[0].empty_pod_text;
                      automatic_publication_status = results[0].automatic_publication_status_text;
                      temp_status_text = results[0].temp_status_text;

                      empty_ob_price = results[0].ob_empty_price;
                      gold_price = results[0].gold_tarif;
                      premium_price = results[0].primium_tarif;
                      classic_price = results[0].classic_tarif;
                      quick_price = results[0].quick_tarif;
                      easy_price = results[0].quick_tarif;


                      io.sockets.in(device).emit('load_all_info_action', {empty_ob_price:empty_ob_price,gold_price:gold_price,premium_price:premium_price,classic_price:classic_price,quick_price:quick_price,easy_price:easy_price,empty_pod_text:empty_pod_text,automatic_publication_status:automatic_publication_status,temp_status_text:temp_status_text,currency_ru:currency_ru});

                    }
                );

                  //

              });



        });


};
