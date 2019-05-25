var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var db = require('./config/db.js');

//socket io another files

require('./controllers/io_check_ob.js')(io);
require('./controllers/load_all_info.js')(io);
require('./controllers/upload_photo_video.js')(io);
require('./controllers/load_homeStart.js')(io);
require('./controllers/searchData.js')(io);
require('./controllers/getCountData.js')(io);



//socket io another files


//module.exports = connection;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


//connect to database

var checkob = require('./controllers/rest_checkobyavl.js');

app.use('/service', [checkob]);
//connect to database

io.on('connection', function(socket){
  //console.log('a user connected');

  socket.on('disconnect', function(){
    //console.log('user disconnected');
  });

  // socket.on('chat message2', function(msg){

  // 	console.log('message: ' + msg);

  // 	io.emit('chat message2', msg);


  // });

   socket.on('chat message', function(data){
      console.log(data);

        socket.emit("chat message",data);



  });

		socket.on('obinfo',function(msg){

				//io.emit('obinfo', JSON.stringify(ob));
				db.query(
						'SELECT * FROM `obinfo`',
						function(err, results, fields) {
							var database_request = JSON.stringify(results);

							io.emit('obinfo', {database: database_request});
							console.log(results); // results contains rows returned by server
							console.log(fields); // fields contains extra meta data about results, if available
						}
				);


				//io.emit('obinfo', msg);



		});

});



//time to send
var time_message_obj = {
	"time":7,
	"minutes":0,
	"seconds":0,
}

// var time_message_obj2 = {
// 	"time":15,
// 	"minutes":0,
// 	"seconds":0,
// }


//time to send


function setMessage_email(){

	request.get({url:'http://kazpoisk.kz/public_control/searchusersneirointellect'}, function(err,httpResponse,body){

					console.log(body);

				 })

	console.log("send_message");


}


// setInterval(function(){
//
//
// 	var date = new Date();
//
// 	var hour = date.getHours();
//
// 	var minutes = date.getMinutes();
//
// 	var seconds = date.getSeconds();
//
// 	if((time_message_obj["time"] == hour) && (time_message_obj['minutes'] == minutes) &&
// 	 (time_message_obj['seconds'] == seconds)){
// 		setMessage_email();
// 	}

	// if((time_message_obj2["time"] == hour) && (time_message_obj2['minutes'] == minutes) &&
	//  (time_message_obj2['seconds'] == seconds)){
	// 	setMessage_email();
	// }

	//console.log(hour + " : " + minutes + " : " + seconds);


// },1000);


//Чтобы отправить событие всем, Socket.IO дает нам io.emit:

//io.emit('some event', { for: 'everyone' });

// Если вы хотите отправить сообщение всем, кроме определенного сокета, у нас есть broadcastфлаг:


// io.on('connection', function(socket){
//   socket.broadcast.emit('hi');
// });

//В этом случае, для простоты, мы отправим сообщение всем, включая отправителя.

//io.emit('chat message', msg);



http.listen(3001, function(){
  console.log('listening on *:3001');
});
