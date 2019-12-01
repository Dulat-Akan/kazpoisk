var moment = require('moment-timezone');
var clientId = 'AWNN2lrrAjKYkq0AsXM656L_AoQuQuJFSFeuEXAOyHdyqCmlkaajVIpyKrInFxHfNrGzmzb9l8vnN_GN';
var secret = 'EDuG5NphSi2Laz52OOQxI52QVptVMbk55I1imTwFtw8Rs4QO-RvYOKtW7BJaMyiN7GEHGL3YukeN9uU7';
var request = require('request');
var Storage = require('node-storage');
var store = new Storage('./store/store.js');
//store.put('zapros', '2');
//var ball_store = store.get('ball_id');
//var liveurl = 'https://api.paypal.com'; //live
var liveurl = 'https://api.sandbox.paypal.com'; //test

module.exports = {

     getToken:async function(){

       return new Promise(function(resolve, reject) {
         //promise

         request.post(
           {
                 url: liveurl + '/v1/oauth2/token',
                 headers: {
                    "Accept": "application/json",
                    "Accept-Language": "en_US",
                    "content-type": "application/x-www-form-urlencoded"
                 },
                 auth: {
                    'user': clientId,
                    'pass': secret,
                  },
                  form: {
                    "grant_type": "client_credentials"
                  }
            }, function(err,httpResponse,body){

                  var obj = JSON.parse(body);
                 //console.log(obj.access_token);
                 store.put('access_token', obj.access_token);
                 //access_token
                 resolve(obj.access_token);

               });

          //promise
        });


    },


     getProfile:async function(){

       return new Promise(function(resolve, reject) {
         //promise
         var token = store.get('access_token');
         request.get(
           {
                 url: liveurl + '/v1/invoicing/invoices?page=3&page_size=4&total_count_required=true',
                 headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                 }
            }, function(err,httpResponse,body){

                  var obj = JSON.parse(body);
                 console.log(obj);

                 resolve(obj);

               });

          //promise
        });


    }

}
