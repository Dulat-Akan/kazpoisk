var moment = require('moment-timezone');

module.exports = {

     timeConverter:function(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    },


    getDateStart:function(){


        // var date = new Date();
        //
        // var day = date.getDate();
        //
        // var month = date.getMonth() + 1;
        //
        // var year = date.getFullYear();
        //
        // var d = moment(year + "-" + month + "-" + day + " " + "00:00:00").tz('Asia/Almaty').format();

        //var d = moment().startOf('day').tz('Asia/Almaty').format(); //return normal format
        var d = moment().startOf('day').tz('Asia/Almaty').valueOf() / 1000; //return unix timestamp

        return Math.round(d);

    },

    getDateFinish:function(){

        // var date = new Date();
        //
        // var day = date.getDate();
        //
        // var month = date.getMonth();
        //
        // var year = date.getFullYear();
        //
        // var d = new Date(year, month, day, 23, 59, 59, 59);
      //  var d = moment().endOf('day').tz('Asia/Almaty').format();
        var d = moment().endOf('day').tz('Asia/Almaty').valueOf() / 1000;

        return Math.round(d);

    },

    convertToUnix:function(jsdate){

        //'2012.08.10'
        var converdate = parseInt((new Date(jsdate).getTime() / 1000).toFixed(0));

    },

    converUnixTojsTime:function(time){

      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

      return time;

    }


}
