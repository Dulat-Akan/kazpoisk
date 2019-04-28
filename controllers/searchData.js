var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelper.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('searchData', function (data) {

                   socket.join(data.email);


                   var search = data.search;

                   var sql = "";

                   var city = data.city;
                   var country = data.strana;
                   var aux = false;
                   var bezposr = false;
                   var novostr = false;
                   var photo = false;
                   var srochno = false;
                   var video = false;


                 			aux = formHelper.checkCheckbox(data.aux);
                      bezposr = formHelper.checkCheckbox(data.bezposr);
                      novostr = formHelper.checkCheckbox(data.novostr);
                      photo = formHelper.checkCheckbox(data.photo);
                      srochno = formHelper.checkCheckbox(data.srochno);
                      video = formHelper.checkCheckbox(data.video);

                      var photodb = "";

                      if(photo == true){
                        photodb = "AND `photo_path` != 'n.jpg'";
                      }

                      var videodb = "";

                      if(video == true){
                        videodb = "AND `video` != 'нет'";
                      }

                      var auxdb = "";

                      if(aux == true){
                        auxdb = "AND `vremya_nachala_auxion` != '0'";
                      }

                      var srochnodb = "";

                      if(srochno == true){
                        srochnodb = "AND `srochno` != '0'";
                      }

                      var citydb = "";
                      if((city != "0") && (country != "0")){
                          citydb = "AND `city` LIKE '" + city + "' AND `strana` LIKE '" + country + "'";
                      }

                      var finishsql = "ORDER BY priority DESC, `id` DESC LIMIT 40";

                  var $searchusersemail = formHelper.inputFilter(data.useremailsearch);


                  var deletedob = "AND `status` != 'no' AND `status` != 'deleted'";

                   		switch (search) {
                   			case 'kv':

                 				 var etazh_do = formHelper.inputFilter(data.etazhdokv);
                 				 var etazh_ot = formHelper.inputFilter(data.etazhotkv);
                 				 var kol_komn = formHelper.inputFilter(data.komn);
                 				 var kv = formHelper.inputFilter(data.kv);
                 				 var category3 = formHelper.inputFilter(data.kv2);
                 				 var ploshad_do = formHelper.inputFilter(data.ploshaddokv);
                 				 var ploshad_ot = formHelper.inputFilter(data.ploshadotkv);
                 				 var sena_do = formHelper.inputFilter(data.senadokv);
                 				 var sena_ot = formHelper.inputFilter(data.senaotkv);


                   				if(kv == "купить"){
                   					kv = "Продать";
                   				}else if(kv == "снять"){
                   					kv = "Сдать";
                   				}else if(kv == "обменять"){
                   					kv = "Обменять";
                   				}

                   				var komnatdb = "";

                   				if(kol_komn == "0"){
                   					  komnatdb = "AND `komnat` < '20'";
                   				}

                   				if(kol_komn == "1-2"){

                   					komnatdb = "AND `komnat` < '3'";

                   				}else if(kol_komn == "1"){

                   					komnatdb = "AND `komnat` = '1'";

                   				}else if(kol_komn == "2"){
                   					komnatdb = "AND `komnat` = '2'";
                   				}else if(kol_komn == "2-3"){
                   					komnatdb = "AND `komnat` > '1' AND `komnat` < '4'";
                   				}else if(kol_komn == "3"){
                   					komnatdb = "AND `komnat` = '3'";
                   				}else if(kol_komn == "3-4"){
                   					komnatdb = "AND `komnat` > '2' AND `komnat` < '5'";
                   				}else if(kol_komn == "4"){
                   					komnatdb = "AND `komnat` = '4'";
                   				}else if(kol_komn == "5"){
                   					komnatdb = "AND `komnat` = '5'";
                   				}else if(kol_komn == "6"){
                   					komnatdb = "AND `komnat` > '5'";
                   				}

                   					senadb = "AND `sena` >= '0' AND `sena` <= '10000000000000'";

                   				if((sena_ot >= "0") && (sena_do >= sena_ot) && (sena_do > "0")){
                   					senadb = "AND `sena` >= '" + sena_ot + "' AND `sena` <= '" + sena_do + "'";
                   				}

                   					var etazhdb = "AND `etazh` >= '0' AND `etazh` <= '200'";
                   				if((etazh_ot >= "0") && (etazh_do >= etazh_ot) && (etazh_do > "0")){
                   					etazhdb = "AND `etazh` >= '" + etazh_ot + "' AND `etazh` <= '" + etazh_do + "'";
                   				}

                   					var ploshaddb = "AND `obsh_ploshad` >= '0' AND `obsh_ploshad` <= '10000000000'";
                   				if((ploshad_ot >= "0") && (ploshad_do >= ploshad_ot) && (ploshad_do > "0")){
                   					ploshaddb = "AND `obsh_ploshad` >= '" + ploshad_ot + "' AND `obsh_ploshad` <= '" + ploshad_do + "'";
                   				}


                   				var category3db = "AND `category3` = '" + category3 + "'";

                   				sql = "SELECT * FROM `obinfo` WHERE `category2` LIKE '%" + kv + "%' " + category3db + " " + komnatdb + " " + senadb + " " + etazhdb + " " + ploshaddb + " " + citydb + " " + photodb + " " + videodb + " " + auxdb + " " + deletedob + " " + finishsql;

                   				break;

                   				case 'avto':

                   						var cat2 = "";

                   						if(data.category2 != ""){
                   							var category2 = formHelper.inputFilter(data.category2);
                   							if(category2 == "купить машину"){
                   								cat2 = "продать машину";
                   							}
                   						}

                   						var korobkadb = "";
                   						if(data.korobka != ""){

                   								var korobka = formHelper.inputFilter(data.korobka);
                   								korobkadb = "AND `korobka40x` LIKE '%" + korobka + "%'";

                   						}

                   						var markadb = "";

                   						if(data.markasearch != ""){

                   								var marka = formHelper.inputFilter(data.marka);
                   								var model = formHelper.inputFilter(data.model);
                   								markadb = "AND `marka40x` LIKE '%" + marka + "%' AND `model40x` LIKE '%" + model + "%'";

                   						}

                   						var senadb = "";
                   						if((data.senaotav != "") && (data.senadoav != "")){

                   							var senaotav = formHelper.inputFilter(data.senaotav);
                   							var senadoav = formHelper.inputFilter(data.senadoav);

                   							if((senaotav >= "0") && (senadoav >= senaotav) && (senadoav > "0")){

                   								senadb = "AND `sena` >= '" + senaotav + "' AND `sena` <= '" + senadoav + "'";

                   							}
                   						}

                   						if((data.yearot != "") && (data.yeardo != "")){

                   							var yearot = formHelper.inputFilter(data.yearot);
                   							var yeardo = formHelper.inputFilter(data.yeardo);

                   							var yeardb = "";
                   							if((yearot >= "0") && (yeardo > "0") && (yeardo < "2100") && (yearot <= $yeardo)){

                   								yeardb = "AND `year_build_car` >= '" + yearot + "' AND `year_build_car` <= '" + yeardo + "'";

                   							}

                   						}
                   //rab
                   						var svetavtodb = "";

                   						if(data.svetavto != ""){
                   							var svetavto = formHelper.inputFilter(data.svetavto);

                   							if(svetavto != ""){
                   								svetavtodb = "AND `svet40x` LIKE '%" + svetavto + "%'";
                   							}
                   						}

                   						var toplivodb = "";

                   						if(data.toplivo != ""){

                   								var toplivo = formHelper.inputFilter(data.toplivo);
                   								var toplivodb = "AND `toplivo40x` LIKE '%" + toplivo + "%'";

                   						}

                   						var category3db = "";
                   						if(data.category3 != ""){

                   								var category3 = formHelper.inputFilter(data.category3);
                   								var category3db = "AND `category3` LIKE '%" + category3 + "%'";


                   						}

                   						var ruldb = "";
                   						if(data.rul != ""){
                   							var rul = formHelper.inputFilter(data.rul);

                   							if(rul != "левый"){
                   								ruldb = "AND `rul40x` LIKE '%" + rul + "%'";
                   							}

                   						}

                   				sql = "SELECT * FROM `obinfo` WHERE `category2` LIKE '%" + cat2 + "%' " + citydb + " " + photodb + " " + videodb + " " + auxdb + " " + srochnodb + " " + korobkadb + " " + markadb + " " + senadb + " " + yeardb + " " + svetavtodb + " " + toplivodb + " " + category3db + " " + ruldb + " " + deletedob + " " + finishsql;

                   				break;


                   				case 'spest':

                   						var cat2 = "";

                   						if(data.category2 != ""){
                   							var category2 = formHelper.inputFilter(data.category2);
                   							if(category2 == "спецтехника"){
                   								cat2 = "спецтехника";
                   							}
                   						}

                   						var korobkadb = "";
                   						if(data.korobka){

                   								var korobka = formHelper.inputFilter(data.korobka);
                   								korobkadb = "AND `korobka45x` LIKE '%" + korobka + "%'";

                   						}

                   						var markadb = "";

                   						if(data.marka != ""){
                   								var marka = formHelper.inputFilter(data.marka);
                   								markadb = "AND `marka_spes45x` LIKE '%" + marka + "%'";
                   						}

                   						$senadb = "";
                   						if((data.senaotav != "") && (data.senadoav != "")){

                   							var senaotav = formHelper.inputFilter(data.senaotav);
                   							var senadoav = formHelper.inputFilter(data.senadoav);

                   							if(senaotav >= "0" && senadoav >= senaotav && senadoav > "0"){

                   								senadb = "AND `sena` >= '" + senaotav + "' AND `sena` <= '" + senadoav + "'";

                   							}
                   						}

                   						if((data.yearot != "") && (data.yeardo != "")){

                   							var yearot = formHelper.inputFilter(data.yearot);
                   							var yeardo = formHelper.inputFilter(data.yeardo);

                   							var yeardb = "";
                   							if((yearot >= "0") && (yeardo > "0") && (yeardo < "2100") && (yearot <= yeardo)){

                   								yeardb = "AND `year_build45x` >= '" + yearot + "' AND `year_build45x` <= '" + yeardo + "'";

                   							}

                   						}
                   //rab
                   						var svetavtodb = "";

                   						if(data.svetavto != ""){
                   							var svetavto = formHelper.inputFilter(data.svetavto);

                   							if(svetavto != ""){
                   								svetavtodb = "AND `svet45x` LIKE '%" + svetavto + "%'";
                   							}
                   						}

                   						var toplivodb = "";

                   						if(data.toplivo != ""){

                   								var toplivo = formHelper.inputFilter(data.toplivo);
                   								toplivodb = "AND `toplivo45x` LIKE '%" + toplivo + "%'";

                   						}

                   						var category3db = "";
                   						if(data.category3 != ""){

                   								var category3 = formHelper.inputFilter(data.category3);

                   								category3db = "AND `category3` LIKE '%" + category3 + "%'";

                   						}


                   						var ruldb = "";
                   						if(data.rul != ""){
                   							var rul = formHelper.inputFilter(data.rul);

                   							ruldb = "AND `rul45x` LIKE '" + rul + "'";

                   						}


                   				sql = "SELECT * FROM `obinfo` WHERE `category2` LIKE '%" + cat2 + "%' " + citydb + " " + photodb + " " + videodb + " " + auxdb + " " + srochnodb + " " + korobkadb + " " + markadb + " " + senadb + " " + yeardb + " " + svetavtodb + " " + toplivodb + " " + category3db + " " + ruldb + " " + deletedob + " " + finishsql;

                   				break;

                   				//spes
                   				//zapchlegk

                   				case 'zapchlegk':

                   						if($city != "0" && $country != "0"){
                   								$citydb = "AND `city` LIKE '".$city."' AND `strana` LIKE '".$country."'";
                   						}else{
                   								$citydb = "";
                   						}

                   						$cat2 = "";

                   						if(isset($_GET['category2'])){
                   							$category2 = $this->cleanfiltrationapp($_GET['category2']);
                   							if($category2 == "запчасти"){
                   								$cat2 = "запчасти";
                   							}

                   						}

                   						$photodb = "";

                   						if(isset($photo[0])){
                   							if($photo[0] == "фото"){
                   								$photodb = "AND `photo_path` != 'n.jpg'";
                   							}
                   						}

                   						$videodb = "";

                   						if(isset($video[0])){
                   							if($video[0] == "video"){
                   								$videodb = "AND `video` != 'нет'";
                   							}
                   						}

                   						$auxdb = "";

                   						if(isset($aux[0])){
                   							if($aux[0] == "aux"){
                   								$auxdb = "AND `vremya_nachala_auxion` != '0'";
                   							}
                   						}



                   						$markadb = "";

                   						if(isset($_GET['markasearch'])){
                   							if($_GET['markasearch'] != ""){
                   								$marka = $this->cleanfiltrationapp($_GET['marka']);
                   								$model = $this->cleanfiltrationapp($_GET['model']);
                   								$markadb = "AND `marka_legk67x` LIKE '%".$marka."%' AND `model67x` LIKE '%".$model."%'";
                   							}
                   						}

                   						$senadb = "";
                   						if(isset($_GET['senaotav']) && isset($_GET['senadoav'])){

                   							$senaotav = $this->cleanfiltrationapp($_GET['senaotav']);
                   							$senadoav = $this->cleanfiltrationapp($_GET['senadoav']);
                   							//$valyuta = $_GET['valyuta'];

                   							if($senaotav >= "0" && $senadoav >= $senaotav && $senadoav > "0"){

                   								$senadb = "AND `sena` >= '".$senaotav."' AND `sena` <= '".$senadoav."'";

                   							}
                   						}


                   						$sostoyaniedb = "";

                   						if(isset($_GET['sostoyanie'])){
                   							$sostoyanie = $this->cleanfiltrationapp($_GET['sostoyanie']);

                   							if($sostoyanie != "all"){
                   								$sostoyaniedb = "AND `sost_zapch_legk77` LIKE '%".$sostoyanie."%'";
                   							}

                   						}

                   						$whereisdb = "";

                   						if(isset($_GET['whereis'])){

                   							$whereis = $_GET['whereis'];
                   							if($whereis != "all"){
                   								$whereisdb = "AND `category3` LIKE '".$whereis."'";
                   							}

                   						}



                   				$sql = "SELECT * FROM `obinfo` WHERE `category2` LIKE '%$cat2%' $citydb $photodb $videodb $auxdb $sostoyaniedb $markadb $senadb $whereisdb AND `marka_zapch_spes68x` = 'нет' $deletedob ORDER BY priority DESC, `id` DESC LIMIT 40";





                   				break;

                   				//zapchlegk




                   				case 'zapchspest':

                   						if($city != "0" && $country != "0"){
                   								$citydb = "AND `city` LIKE '".$city."' AND `strana` LIKE '".$country."'";
                   						}else{
                   								$citydb = "";
                   						}

                   						$cat2 = "";

                   						if(isset($_GET['category2'])){
                   							$category2 = $this->cleanfiltrationapp($_GET['category2']);
                   							if($category2 == "запчасти"){
                   								$cat2 = "запчасти";
                   							}

                   						}

                   						$photodb = "";

                   						if(isset($photo[0])){
                   							if($photo[0] == "фото"){
                   								$photodb = "AND `photo_path` != 'n.jpg'";
                   							}
                   						}

                   						$videodb = "";

                   						if(isset($video[0])){
                   							if($video[0] == "video"){
                   								$videodb = "AND `video` != 'нет'";
                   							}
                   						}

                   						$auxdb = "";

                   						if(isset($aux[0])){
                   							if($aux[0] == "aux"){
                   								$auxdb = "AND `vremya_nachala_auxion` != '0'";
                   							}
                   						}



                   						$markadb = "";

                   						if(isset($_GET['marka'])){
                   							if($_GET['marka'] != ""){
                   								$marka = $this->cleanfiltrationapp($_GET['marka']);

                   								$markadb = "AND `marka_zapch_spes68x` LIKE '%".$marka."%'";
                   							}
                   						}

                   						$senadb = "";
                   						if(isset($_GET['senaotav']) && isset($_GET['senadoav'])){

                   							$senaotav = $this->cleanfiltrationapp($_GET['senaotav']);
                   							$senadoav = $this->cleanfiltrationapp($_GET['senadoav']);
                   							//$valyuta = $_GET['valyuta'];

                   							if($senaotav >= "0" && $senadoav >= $senaotav && $senadoav > "0"){

                   								$senadb = "AND `sena` >= '".$senaotav."' AND `sena` <= '".$senadoav."'";

                   							}
                   						}


                   						$sostoyaniedb = "";

                   						if(isset($_GET['sostoyanie'])){
                   							$sostoyanie = $this->cleanfiltrationapp($_GET['sostoyanie']);

                   							if($sostoyanie != "all"){
                   								$sostoyaniedb = "AND `sost_zapch_spes75` LIKE '%".$sostoyanie."%'";
                   							}

                   						}

                   						$whereisdb = "";

                   						if(isset($_GET['whereis'])){

                   							$whereis = $_GET['whereis'];
                   							if($whereis != "all"){
                   								$whereisdb = "AND `category3` LIKE '".$whereis."'";
                   							}

                   						}



                   				$sql = "SELECT * FROM `obinfo` WHERE `category2` LIKE '%$cat2%' $citydb $photodb $videodb $auxdb $sostoyaniedb $markadb $senadb $whereisdb AND `marka_legk67x` = 'нет' $deletedob ORDER BY priority DESC, `id` DESC LIMIT 40";





                   				break;

                   				//zapchspest


                   				case 'shini':

                   						if($city != "0" && $country != "0"){
                   								$citydb = "AND `city` LIKE '".$city."' AND `strana` LIKE '".$country."'";
                   						}else{
                   								$citydb = "";
                   						}

                   						$cat2 = "";

                   						if(isset($_GET['category2'])){
                   							$category2 = $this->cleanfiltrationapp($_GET['category2']);
                   							if($category2 == "запчасти"){
                   								$cat2 = "запчасти";
                   							}

                   						}

                   						$photodb = "";

                   						if(isset($photo[0])){
                   							if($photo[0] == "фото"){
                   								$photodb = "AND `photo_path` != 'n.jpg'";
                   							}
                   						}

                   						$videodb = "";

                   						if(isset($video[0])){
                   							if($video[0] == "video"){
                   								$videodb = "AND `video` != 'нет'";
                   							}
                   						}

                   						$auxdb = "";

                   						if(isset($aux[0])){
                   							if($aux[0] == "aux"){
                   								$auxdb = "AND `vremya_nachala_auxion` != '0'";
                   							}
                   						}



                   						$markadb = "";

                   						if(isset($_GET['marka'])){
                   							if($_GET['marka'] != ""){
                   								$marka = $this->cleanfiltrationapp($_GET['marka']);

                   								$markadb = "AND `marka_shini55x` LIKE '%".$marka."%'";
                   							}
                   						}

                   						$senadb = "";
                   						if(isset($_GET['senaotav']) && isset($_GET['senadoav'])){

                   							$senaotav = $this->cleanfiltrationapp($_GET['senaotav']);
                   							$senadoav = $this->cleanfiltrationapp($_GET['senadoav']);
                   							//$valyuta = $_GET['valyuta'];

                   							if($senaotav >= "0" && $senadoav >= $senaotav && $senadoav > "0"){

                   								$senadb = "AND `sena` >= '".$senaotav."' AND `sena` <= '".$senadoav."'";

                   							}
                   						}


                   						$protectordb = "";

                   						if(isset($_GET['protector'])){
                   							$protector = $this->cleanfiltrationapp($_GET['protector']);

                   							if($protector != "нет"){
                   								$protectordb = "AND `protector55x` LIKE '%".$protector."%'";
                   							}

                   						}

                   						$yearbuilddb = "";

                   						if(isset($_GET['yearshina'])){
                   							$yearshina = $this->cleanfiltrationapp($_GET['yearshina']);

                   							if($yearshina != 0){
                   								$yearbuilddb = "AND `year_build_shina55x` LIKE '%".$yearshina."%'";
                   							}
                   						}

                   						$diamshinadb = "";

                   						if(isset($_GET['diamshina'])){
                   							$diamshina = $this->cleanfiltrationapp($_GET['diamshina']);
                   							if($diamshina != "0"){
                   								$diamshinadb = "AND `diam_shina55x` LIKE '%".$diamshina."%'";
                   							}
                   						}


                   						$iznosshinadb = "";

                   						if(isset($_GET['iznosshina'])){
                   							$iznosshina = $this->cleanfiltrationapp($_GET['iznosshina']);
                   							if($iznosshina != 0){
                   								$iznosshinadb = "AND `iznos_shina55x` LIKE '%".$iznosshina."%'";
                   							}
                   						}

                   						$countshinadb = "";

                   						if(isset($_GET['countshina'])){
                   							$countshina = $this->cleanfiltrationapp($_GET['countshina']);
                   							if($countshina != 0){
                   								$countshinadb = "AND `kol_shtuk55x` LIKE '%".$countshina."%'";
                   							}
                   						}

                   						$classificationdb = "";

                   						if(isset($_GET['classification'])){
                   							$classification = $this->cleanfiltrationapp($_GET['classification']);
                   							if($classification != 0){
                   								$classificationdb = "AND `type_shina56x` LIKE '%".$classification."%'";
                   							}
                   						}





                   				$sql = "SELECT * FROM `obinfo` WHERE `category2` LIKE '%$cat2%' AND `category3` LIKE '%Шины%' $citydb $photodb $videodb $auxdb $protectordb $markadb $senadb $yearbuilddb $diamshinadb $iznosshinadb $countshinadb $classificationdb $deletedob ORDER BY priority DESC, `id` DESC LIMIT 40";





                   				break;

                   				//shini



                   				case 'diski':

                   						if($city != "0" && $country != "0"){
                   								$citydb = "AND `city` LIKE '".$city."' AND `strana` LIKE '".$country."'";
                   						}else{
                   								$citydb = "";
                   						}

                   						$cat2 = "";

                   						if(isset($_GET['category2'])){
                   							$category2 = $this->cleanfiltrationapp($_GET['category2']);
                   							if($category2 == "запчасти"){
                   								$cat2 = "запчасти";
                   							}

                   						}

                   						$photodb = "";

                   						if(isset($photo[0])){
                   							if($photo[0] == "фото"){
                   								$photodb = "AND `photo_path` != 'n.jpg'";
                   							}
                   						}

                   						$videodb = "";

                   						if(isset($video[0])){
                   							if($video[0] == "video"){
                   								$videodb = "AND `video` != 'нет'";
                   							}
                   						}

                   						$auxdb = "";

                   						if(isset($aux[0])){
                   							if($aux[0] == "aux"){
                   								$auxdb = "AND `vremya_nachala_auxion` != '0'";
                   							}
                   						}



                   						$markadb = "";

                   						if(isset($_GET['marka'])){
                   							if($_GET['marka'] != ""){
                   								$marka = $this->cleanfiltrationapp($_GET['marka']);

                   								$markadb = "AND `marka_shini55x` LIKE '%".$marka."%'";
                   							}
                   						}

                   						$senadb = "";
                   						if(isset($_GET['senaotav']) && isset($_GET['senadoav'])){

                   							$senaotav = $this->cleanfiltrationapp($_GET['senaotav']);
                   							$senadoav = $this->cleanfiltrationapp($_GET['senadoav']);
                   							//$valyuta = $_GET['valyuta'];

                   							if($senaotav >= "0" && $senadoav >= $senaotav && $senadoav > "0"){

                   								$senadb = "AND `sena` >= '".$senaotav."' AND `sena` <= '".$senadoav."'";

                   							}
                   						}


                   						$protectordb = "";

                   						if(isset($_GET['typed'])){
                   							$protector = $_GET['typed'];

                   							if($protector != "нет"){
                   								$protectordb = "AND `type_diska217x56x` LIKE '%".$protector."%'";
                   							}

                   						}

                   						$yearbuilddb = "";

                   						if(isset($_GET['yearshina'])){
                   							$yearshina = $_GET['yearshina'];

                   							if($yearshina != 0){
                   								$yearbuilddb = "AND `year_disk17x56x` LIKE '%".$yearshina."%'";
                   							}
                   						}

                   						$diamshinadb = "";

                   						if(isset($_GET['diamshina'])){
                   							$diamshina = $_GET['diamshina'];
                   							if($diamshina != "0"){
                   								$diamshinadb = "AND `diam_diska17x56x` LIKE '%".$diamshina."%'";
                   							}
                   						}


                   						$iznosshinadb = "";

                   						if(isset($_GET['iznosshina'])){
                   							$iznosshina = $_GET['iznosshina'];
                   							if($iznosshina != 0){
                   								$iznosshinadb = "AND `iznos_diska17x56x` LIKE '%".$iznosshina."%'";
                   							}
                   						}

                   						$countshinadb = "";

                   						if(isset($_GET['countshina'])){
                   							$countshina = $_GET['countshina'];
                   							if($countshina != 0){
                   								$countshinadb = "AND `kol_shtuk_diskov17x56x` LIKE '%".$countshina."%'";
                   							}
                   						}

                   						$classificationdb = "";

                   						if(isset($_GET['classification'])){
                   							$classification = $_GET['classification'];
                   							if($classification != 0){
                   								$classificationdb = "AND `type_disk56x` LIKE '%".$classification."%'";
                   							}
                   						}





                   				$sql = "SELECT * FROM `obinfo` WHERE `category2` LIKE '%$cat2%' AND `category3` LIKE '%Диски%' $citydb $photodb $videodb $auxdb $protectordb $markadb $senadb $yearbuilddb $diamshinadb $iznosshinadb $countshinadb $classificationdb $deletedob ORDER BY priority DESC, `id` DESC LIMIT 40";





                   				break;

                   				//diski



                   				case 'uslugitransport':

                   						if($city != "0" && $country != "0"){
                   								$citydb = "AND `city` LIKE '".$city."' AND `strana` LIKE '".$country."'";
                   						}else{
                   								$citydb = "";
                   						}



                   						$photodb = "";

                   						if(isset($photo[0])){
                   							if($photo[0] == "фото"){
                   								$photodb = "AND `photo_path` != 'n.jpg'";
                   							}
                   						}

                   						$videodb = "";

                   						if(isset($video[0])){
                   							if($video[0] == "video"){
                   								$videodb = "AND `video` != 'нет'";
                   							}
                   						}

                   						$auxdb = "";

                   						if(isset($aux[0])){
                   							if($aux[0] == "aux"){
                   								$auxdb = "AND `vremya_nachala_auxion` != '0'";
                   							}
                   						}





                   						$senadb = "";
                   						if(isset($_GET['senaotav']) && isset($_GET['senadoav'])){

                   							$senaotav = $_GET['senaotav'];
                   							$senadoav = $_GET['senadoav'];
                   							//$valyuta = $_GET['valyuta'];

                   							if($senaotav >= "0" && $senadoav >= $senaotav && $senadoav > "0"){

                   								$senadb = "AND `sena` >= '".$senaotav."' AND `sena` <= '".$senadoav."'";

                   							}
                   						}

                   						$category1db = "";

                   						if(isset($_GET['category1'])){		//ispolzuetsya v medisine
                   							$category1 = $_GET['category1'];

                   							$controlv = $_GET['category2'];

                   							if($category1 != "нет" && $controlv == "нет"){
                   								$category1db = "WHERE `category1` LIKE '%".$category1."%'";
                   							}


                   						}


                   						$category2db = "";

                   						if(isset($_GET['category2'])){
                   							$category2 = $_GET['category2'];

                   							if($category2 != "нет"){
                   								$category2db = "WHERE `category2` LIKE '%".$category2."%'";
                   							}


                   						}

                   						$category3db = "";

                   						if(isset($_GET['category3'])){
                   							$category3 = $_GET['category3'];

                   							if($category3 != "нет"){
                   								$category3db = "AND `category3` LIKE '%".$category3."%'";
                   							}

                   							if($category3 == "vacancy"){
                   								$category3db = "AND `category3` LIKE '%Вакансии%'";
                   							}


                   							if($category3 == "zamena"){
                   								$category4 = $_GET['category4'];
                   								$category3db = "AND `category3` LIKE '%".$category4."%'";
                   							}


                   						}




                   				$sql = "SELECT * FROM `obinfo` $category2db $category1db $category3db $citydb $photodb $videodb $auxdb $senadb $deletedob ORDER BY priority DESC, `id` DESC LIMIT 40";





                   				break;

                   				//diski


                   			default:
                   				# code...
                   				break;
                   		}
                   //x10
                   				$countidfirst = 0;

                   				$query = $this->db->query($sql);

                   				$array = array();
                   				$arraytwo = array();

                   				foreach ($query->result() as $row)
                   				{
                   					if($row->photo_path != "n.jpg"){

                   						if(unserialize($row->photo_path) == true){
                   							$array[] = unserialize($row->photo_path);
                   						}else{
                   							$array[] = "n.jpg";
                   						}

                   					}else{
                   						$array[] = "n.jpg";
                   					}

                   					if($row->video != "нет"){

                   					if(unserialize($row->video) == true){
                   						$arraytwo[] = unserialize($row->video);
                   						}else{
                   							$arraytwo[] = "нет";
                   						}

                   					}else{
                   						$arraytwo[] = "нет";
                   					}

                   					$countidfirst = $row->id;
                   				}

                   				//$searchusersemail
                   				//sql
                   				//$countidfirst
                   //search
                   				$checkset = $this->set_usersearch_logs($sql,$searchusersemail,$countidfirst,$search);
                   				//xx

                   				$arr = array($query->result_array(),$array,$arraytwo,$countidfirst,$sql,$checkset);
                   				//$arr = array($sql,$query->result_array());









                   io.sockets.in(data.email).emit('searchData', {msg: 'test_message'});

              });



        });


};
