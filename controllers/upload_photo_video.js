var db_multiple = require('../config/multiple_mysql.js');
var SocketIOFile = require('socket.io-file');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
var ncp = require('ncp').ncp;

var path = require('path');
const fs = require('fs');

module.exports = function(io){


        io.on('connection', function(socket){

              //var productionphotoPath = '../../kazpoisk/assets/entry/compressed_image';
              //var productionvideoPath = '../../kazpoisk/assets/entry/uploading_video';

              var productionphotoPath = '../../Sites/assets/entry/compressed_image';
              var productionvideoPath = '../../Sites/assets/entry/uploading_video';

              var uploader = new SocketIOFile(socket, {
                  uploadDir: {			// multiple directories
                  	photo: productionphotoPath,
                  	video: productionvideoPath
                  },
                  accepts: ['image/jpeg','image/pjpeg','image/jpg','video/mpeg','video/mp4','video/msvideo','video/avi','application/x-troff-msvideo','video/x-msvideo'],		// chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
                  //maxFileSize: 4194304, 						// 4 MB. default is undefined(no limit)
                  maxFileSize: 200194304, 						// 4 MB. default is undefined(no limit)
                  chunkSize: 10240,							// default is 10240(1KB)
                  transmissionDelay: 0,						// delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
                  overwrite: true, 							// overwrite file if exists, default is true.
                  rename: function(filename, fileInfo) {
                          var file = path.parse(filename);
                          var fname = file.name;
                          var ext = file.ext;
                          var new_generation_name = new Date().getTime();
                      return `${new_generation_name}${ext}`;
                      //return `${fname}_${new_generation_name}${ext}`;
                  }
              });
              uploader.on('start', (fileInfo) => {
                  //console.log('Start uploading');
                  //console.log(fileInfo);
              });
              uploader.on('stream', (fileInfo) => {
                  //console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
              });
              uploader.on('complete', (fileInfo) => {
                  //console.log('Upload Complete.');
                  //console.log(fileInfo);

                  var email = fileInfo.data.email;
                  var insert  = { photo_path: fileInfo.name,originalname:fileInfo.originalFileName,client_id:email};


                  if(fileInfo.mime.indexOf("image") >= 0){
                    var query = db_multiple.query('INSERT INTO temp_photo SET ?', insert, function (error, results, fields) {
                      if (error) throw error;

                      //step 1 compress image
                      //compress image
                    //  var productioninput_path = '../../kazpoisk/assets/entry/compressed_image/*.{jpg,png}';
                    //  var productionoutput_path = '../../kazpoisk/assets/entry/compressed_image';

                      var productioninput_path = '../../Sites/assets/entry/compressed_image/*.{jpg,png}';
                      var productionoutput_path = '../../Sites/assets/entry/compressed_image';

                      (async () => {
                            const files = await imagemin([productioninput_path], productionoutput_path, {
                                plugins: [
                                    imageminJpegtran(),
                                    imageminPngquant({quality: '65-80'})
                                ]
                            });

                            console.log(files);

                            ncp.limit = 16;


                            setTimeout(function(){

                              //step 2 copy to destination directory
                              //copy images
                              //var productionfinishpath = '../../kazpoisk/assets/entry/uploads';
                              var productionfinishpath = '../../Sites/assets/entry/uploads';

                              ncp(productionoutput_path, productionfinishpath, function (err) {
                               if (err) {
                                 return console.error(err);
                               }
                               //console.log('done!');
                              });

                              //copy images

                              setTimeout(function(){

                                //step3 delete from directory

                                fs.readdir(productionoutput_path, (err, files) => {
                                  if (err) throw err;

                                  for (const file of files) {
                                    fs.unlink(path.join(productionoutput_path, file), err => {
                                      if (err) throw err;
                                    });
                                  }
                                });
                                //step3 delete from directory

                              },1000);

                            },1000);


                        })();
                      //compress image

                    });
                  }
                  if(fileInfo.mime.indexOf("video") >= 0){
                    var query = db_multiple.query('INSERT INTO temp_video SET ?', insert, function (error, results, fields) {
                      if (error) throw error;

                    });
                  }


              });
              uploader.on('error', (err) => {
                  //console.log('Error!', err);
              });
              uploader.on('abort', (fileInfo) => {
                  //console.log('Aborted: ', fileInfo);
              });



        });


};
