var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
var Serialize = require('php-serialize');
var timeConverter = require('../models/timeconverter.js');

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('sendData', function (data) {

                   socket.join(data.email);

                   var insert = {
              					zagolovok : data.zagolovok,
              					category1 : data.category1,
              					category2 :  data.category2,
              					category3 :  data.category3,
              					sena :  data.sena,
              					valyuta :  data.valyuta,
              					nalichii :  data.nalichii,
              					opisanie :  data.opisanie,
              					strana :  data.strana,
              					city :  data.city,
              					email :  data.email,
              					telephone :  data.telephone,
              					obmen :  data.obmen,
              					nalichii :  data.nalichii1,
              					watsapp :  data.watsapp,
              					viber :  data.viber,
              					instagram :  data.instagram,
              					vk :  data.vk,
              					skype :  data.skype,
              					mail :  data.mail,
              					google :  data.google,
              					other :  data.other,
              					chastn_liso :  data.chastn_liso,
              					kompaniya :  data.kompaniya,
              					biznes :  data.biznes,
              					agenstvo :  data.agenstvo,
              					naimenovanie :  data.naimenovanie,
              					commentarii :  data.commentarii,

              					komnat :  data.kolkomnat,
              					obsh_ploshad :  data.ploshad1,
              					etazh :  data.etazh1,
              					mat_sten :  data.materialsten,
              					tip_doma :  data.typedoma,
              					et_v_dome :  data.etazhvdome,
              					year_build :  data.yearpostroiki2,
              					sostoyanie22x :  data.sostoyanie22x,
              					sanuzel22x :  data.sanuzel22x,
              					dver22x :  data.dver22x,
              					poli22x :  data.poli22x,
              					telephone22x :  data.telephone22x,
              					balkon22x :  data.balkon22x,
              					parkovka22x :  data.parkovka22x,
              					steni22x :  data.steni22x,
              					internet22x :  data.internet22x,
              					balkon_osteklennii22x :  data.balkon_osteklennii22x,
              					mebel22x :  data.mebel22x,
              					otoplenie22x :  data.otoplenie22x,
              					signalizasiya22x :  data.signalizasiya22x,
              					videonabl22x :  data.videonabl22x,
              					konserzh22x :  data.konserzh22x,
              					domofon22x :  data.domofon22x,
              					ohrana22x :  data.ohrana22x,
              					kodov_zamok22x :  data.kodov_zamok22x,
              					reshetki_na_oknah :  data.reshetki_na_oknah,
              					datchik_dvizh22x :  data.datchik_dvizh22x,
              					video_domof22x :  data.video_domof22x,
              					udobno_pod_kommers22x :  data.udobno_pod_kommers22x,
              					neuglov22x :  data.neuglov22x,
              					plastik_okna22x :  data.plastik_okna22x,
              					kuhnya_studiya22x :  data.kuhnya_studiya22x,
              					uluchshennaya22x :  data.uluchshennaya22x,
              					komn_izolir22x :  data.komn_izolir22x,
              					new_santehnika22x :  data.new_santehnika22x,
              					vstroennaya_kuhnya22x :  data.vstroennaya_kuhnya22x,
              					imeetsya_kladov22x :  data.imeetsya_kladov22x,
              					schetchiki22x :  data.schetchiki22x,
              					tihii_dvor22x :  data.tihii_dvor22x,
              					konditioner22x :  data.konditioner22x,

              					rasst_ot_goroda25x :  data.rasstotgoroda,
              					s_doma25x :  data.ploshaddoma,
              					type_doma25x :  data.typedoma,
              					year_build25x :  data.yearpostroiki3,
              					rasst_ot_goroda26x :  data.rasstotgoroda,
              					s_doma26x :  data.ploshaddoma1,
              					s_uchastka26x :  data.ploshaduchastka,
              					type_doma26x :  data.typedoma,
              					rasst_ot_goroda27x :  data.rasstotgoroda,
              					s_uchastka27x :  data.ploshaduchastka1,
              					kol_komnat28x :  data.kolkomnat1,
              					s_obsh28x :  data.ploshad2,
              					etazh28x :  data.etazh2,
              					et_v_zdanii28x :  data.etazhvzdanii,
              					type_ofisa28x :  data.typepomesheniya,
              					s_obsh29x :  data.ploshad3,
              					etazh29x :  data.etazh2,
              					et_v_zdanii29x :  data.etazhvzdanii1,
              					type_pomesheniya29x :  data.typepomesheniya,
              					year_build30x :  data.yearpostroiki,
              					s_obsh30x :  data.ploshad4,
              					et_v_dome30x :  data.etazhvdome,
              					mat_sten30x :  data.materialsten2,
              					type_zdaniya30x :  data.typezdaniya,
              					s_obsh31x :  data.ploshad5,
              					type_pomesheniya31x :  data.typepomesheniya,
              					srok_sdachi :  data.srok_sdachi,
              					kupit_ot33x :  data.kupit_ot,
              					kupit_do33x :  data.kupit_do,
              					valyuta33x :  data.valyuta33x,

              					marka40x :  data.marka,
              					model40x :  data.model,
              					year_build_car :  data.yearavto,

              					probeg40x :  data.probeg,
              					obem40x :  data.obem,
              					korobka40x :  data.korobka,
              					bezdokov40x :  data.bezdokov40x,
              					bit_ili_na_zak40x :  data.obmen2,
              					prodazha_po_zapchast40x :  data.obmen3,
              					trebuyutsya_vlozheniya40x :  data.obmen4,
              					eta_mash_na_zakaz40x :  data.obmen5,
              					mash_prosh_tuning40x :  data.tuning,
              					rul40x :  data.rul,
              					toplivo40x :  data.toplivo,
              					privod40x :  data.privod,
              					svet40x :  data.svet,
              					sostoyanie_mash40x :  data.sostoyanie,

              					marka_spes45x :  data.markaspes,
              					model45x :  data.modelspes,
              					probeg45x :  data.probegspes,
              					obem45x :  data.obemspes,
              					korobka45x :  data.korobkaspes,
              					bezdokov45x :  data.typespes,				//type spes
              					bit_ili_na_zak45x :  data.obmen2spes,
              					prodazha_po_zapchast45x :  data.obmen3spes,
              					trebyutsya_vlozheniya45x :  data.obmen4spes,
              					eta_mash_na_zakaz45x :  data.obmen5spes,
              					sostoyanie_mash45x :  data.sostoyaniespes,
              					rul45x :  data.rulspes,
              					toplivo45x :  data.toplivospes,
              					privod45x :  data.privodspes,
              					svet45x :  data.svetspes,
              					year_build45x :  data.yearspes,
              					kol_mest50x :  data.kol_mest50x,
              					nar50x :  data.nar50x,
              					vis_vish50x :  data.vis_vish50x,
              					nar50x2 :  data.nar50x2,
              					vis_vish50x2 :  data.vis_vish50x2,
              					gruzop50x2 :  data.gruzop50x2,
              					ob_sist51x :  data.ob_sist51x,

              					narab50x3 :  data.narab50x3,
              					vis_pod50x3 :  data.vis_pod50x3,
              					narab50x4 :  data.narab50x4,
              					ob_sist414x :  data.ob_sist414x,
              					narab50x5 :  data.narab50x5,
              					massa214x :  data.massa214x,
              					gruzop214x :  data.gruzop214x,
              					narab614x :  data.narab614x,
              					gruzop614x :  data.gruzop614x,
              					massa814x :  data.massa814x,
              					narab914x :  data.narab914x,
              					ob_kov514x :  data.ob_kov514x,
              					massa1014x :  data.massa1014x,
              					narab1114x :  data.narab1114x,
              					mosh1414x :  data.mosh1414x,

              					marka_legk67x :  data.markazapch,
              					model67x :  data.modelzapch,
              					sost_zapch_legk77 :  data.sostzapch,
              					marka_zapch_spes68x :  data.marka_zapch_spes68x,
              					sost_zapch_spes75 :  data.sost_zapch_spes75,
              					sena_ot_zap :  data.sena_ot_zap,
              					sena_do_zap :  data.sena_do_zap,
              					valyuta_zapch :  data.typezapchasti, //typezapchasti
              					type_shina55x :  data.typeshina,
              					marka_shini55x :  data.markashini,
              					protector55x :  data.protectori,
              					year_build_shina55x :  data.yearshina,
              					diam_shina55x :  data.diamshini,
              					iznos_shina55x :  data.iznosshina,
              					kol_shtuk55x :  data.kol_shin,

              					type_disk56x :  data.typedisk,
              					model_diska56x :  data.markadisk,
              					type_diska217x56x :  data.typelitie,
              					year_disk17x56x :  data.yeardisk,
              					diam_diska17x56x :  data.diamdisk,
              					iznos_diska17x56x :  data.iznosdiska,
              					kol_shtuk_diskov17x56x :  data.kol_disk,
              					date_start_aux777 :  data.date_start_aux777,
              					date_finish_aux777 :  data.date_finish_aux777,
              					selev_auditor777 :  data.selev_auditor777,
              					kol_uchastn777 :  data.kol_uchastn777,
              					dostavka777 :  data.dostavka777,
              					res_peremen_string1 :  data.res_peremen_string1,
              					res_peremen_string2 :  data.res_peremen_string2,
              					res_peremen_string3 :  data.res_peremen_string3,
              					res_peremen_chisl4 :  data.res_peremen_chisl4,
              					res_peremen_chisl5 :  data.res_peremen_chisl5,
              					res_peremen_chisl6 :  data.res_peremen_chisl6,
              					status :  data.status,
              					r_alm :  data.r_alm,
              					city_alm :  data.city_alm,
              					r_astana :  data.r_astana,
              					city_ast :  data.city_ast,
              					vremya_nachala_auxion :  data.vremya_nachala_auxion,
              					vremya_okonch_auxion :  data.vremya_okonch_auxion,
              					device_id :  data.device_id,
              					money :  data.money,
              					enable_money :  data.enable_money,
              					Latitude :  JSON.parse(data.Latitude),
              					Longitude :  JSON.parse(data.Longitude),
              					point :  Serialize.serialize(JSON.parse(data.point))
            				}

                    var fix_photo = 0;
                    var fix_video = 0;

                    db_multiple.query("SELECT * FROM `temp_photo` WHERE `client_id` = ?;SELECT * FROM `temp_video` WHERE `client_id` = ?;", [data.email,data.email], function (error, results, fields) {

                      //console.log(results);

                      var array_photo_path = new Array();
                    	var array_originalname = new Array();
                    	var delete_one_array_id = new Array();

                      if(results[0].length > 0){

                          for(var j = 0;j < results[0].length;j++){
                              array_photo_path.push(results[0][j].photo_path);
                              array_originalname.push(results[0][j].originalname);
                              delete_one_array_id.push(results[0][j].id);
                          }

                          fix_photo = 1;

                      }

                      var array_photo_path_video = new Array();
                    	var array_originalname_video = new Array();
                    	var delete_two_array_id = new Array();

                      if(results[1].length > 0){

                          for(var j = 0;j < results[1].length;j++){
                              array_photo_path_video.push(results[1][j].photo_path);
                              array_originalname_video.push(results[1][j].originalname);
                              delete_two_array_id.push(results[1][j].id);
                          }

                          fix_video = 1;

                      }

                      var data_photo;

                      if(fix_photo == 1){
                        data_photo = {
                          photo_path : array_photo_path,
                          originalname : array_originalname
                        }

                    		insert.photo_path = Serialize.serialize(data_photo);
                    	}else{

                    		insert.photo_path = "n.jpg";

                    	}

                      var data_video;

                      if(fix_video == 1){
                        data_video = {
                          photo_path : array_photo_path_video,
                          originalname : array_originalname_video
                        }

                    		insert.video = Serialize.serialize(data_video);
                    	}else{
                    		insert.video = "нет";
                    	}


                      insert.date = timeConverter.getUnixtime();
                      insert.date_finish_prodlenie = timeConverter.getUnixtime() + (3600 * 24 * 7);


                      var query = db_multiple.query('INSERT INTO obinfo SET ?', insert, function (error, results, fields) {

                        //console.log(insert);

                            //delete photos
                            const list = delete_one_array_id;

                            if(delete_one_array_id.length > 0){

                              const anAsyncFunction = async item => { //a function that returns a promise
                                return new Promise(function(resolve, reject) {

                                  //console.log(item);
                                  //resolve("ok");
                                  db_multiple.query('DELETE FROM `temp_photo` WHERE `id` = ?',item, function (error, results, fields) {
                                        resolve("ok");
                                  });

                                });
                              }

                              const getData = async () => {
                                return await Promise.all(list.map(item => anAsyncFunction(item)))
                              }


                              getData();

                            }


                            const listtwo = delete_two_array_id;

                            if(delete_two_array_id.length > 0){

                              const anAsyncFunctiontwo = async item => { //a function that returns a promise
                                return new Promise(function(resolve, reject) {


                                  // console.log(item);
                                  // resolve("ok");
                                  db_multiple.query('DELETE FROM `temp_video` WHERE `id` = ?',item, function (error, results, fields) {
                                        resolve("ok");
                                  });

                                });
                              }

                              const getDatatwo = async () => {
                                return await Promise.all(listtwo.map(item => anAsyncFunctiontwo(item)))
                              }

                              getDatatwo();

                            }

                            //delete photos

                            //console.log(error);

                            io.sockets.in(data.email).emit('sendData', {status:"ok"});


                      });



                  });





                   // var query = multiple_db.query('INSERT INTO users_data SET ?', insert, function (error, results, fields) {
                   //   if (error) throw error;
                   //
                   //   check_insert = 1;
                   //
                   // });

                  // io.sockets.in(data.email).emit('sendData', {status: 'ok'});

              });



        });


};
