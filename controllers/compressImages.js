var db = require('../config/db.js');
var db_multiple = require('../config/multiple_mysql.js');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('compress', function (data) {

                   socket.join(data.email);

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

                         })();

                   io.sockets.in(data.email).emit('compress', {msg: 'test_message'});

              });



        });


};
