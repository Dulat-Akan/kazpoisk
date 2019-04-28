var db_multiple = require('../config/multiple_mysql.js');
var SocketIOFile = require('socket.io-file');

var path = require('path');


module.exports = function(io){


        io.on('connection', function(socket){


              var uploader = new SocketIOFile(socket, {
                  uploadDir: {			// multiple directories
                  	photo: '../../Sites/assets/entry/uploading_image',
                  	video: '../../Sites/assets/entry/uploading_video'
                  },
                  //uploadDir: '../../Sites/assets/entry/uploading_image',							// simple directory
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

                    });
                  }
                  if(fileInfo.mime.indexOf("video") >= 0){
                    var query = db_multiple.query('INSERT INTO temp_video SET ?', insert, function (error, results, fields) {
                      if (error) throw error;

                    });
                  }



                  // { name: '1555457966097.jpeg',
                  //   size: 6890,
                  //   wrote: 6890,
                  //   uploadDir:
                  //    '../../Sites/assets/entry/uploading_image/1555457966097.jpeg',
                  //   data: {},
                  //   mime: 'image/jpeg',
                  //   estimated: 28,
                  //   uploadId: 'u_0',
                  //   originalFileName: 'download (2).jpeg' }

              });
              uploader.on('error', (err) => {
                  //console.log('Error!', err);
              });
              uploader.on('abort', (fileInfo) => {
                  //console.log('Aborted: ', fileInfo);
              });



        });


};
