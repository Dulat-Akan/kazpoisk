var moment = require('moment-timezone');
var request = require('request');
var Storage = require('node-storage');
var store = new Storage('./store/store.js');
var multiple_db = require('../config/multiple_mysql.js');




//store.put('zapros', '2');
//var ball_store = store.get('ball_id');
//var liveurl = 'https://api.paypal.com'; //live

module.exports = {

    turnOnDailyMailing:function(){

      multiple_db.query('UPDATE users SET send_message_status = ? WHERE send_message_status = ?', [1,2], function (error, results, fields) {
          //console.log("mailing records updated");
      });

    }

}
