var moment = require('moment-timezone');
var notificationModel = require("./notificationModel.js");
var domainName = "https://2click.org";

module.exports = {

      sendHyperSingle:function(title,htmlmessage,cleanmessage,toUser,fromUser){

              const sendMessage = async () => { //send Mail to 1 user
                   await notificationModel.sendMessage(title,htmlmessage,toUser,fromUser).then(function(result) {

                      console.log(result.response);

                  });
              };

              sendMessage();

              const sendFirebasetoSingleAndroid = async () => {
                   await notificationModel.sendFPMtoSingle(toUser,title,cleanmessage,"new message","new message").then(function(result) {

                      console.log(result);

                  });
              };

              sendFirebasetoSingleAndroid();

              const sendWebFirebasetoSingle = async () => {
                   await notificationModel.sendWebFPMtoSingle(toUser,title,cleanmessage,domainName).then(function(result) {

                      console.log(result);

                  });
              };

              sendWebFirebasetoSingle();

              return "ok";
      },

      sendAllHyper:function(title,htmlmessage,cleanmessage){

        const sendToAllMessage = async () => {    //send to all mail  //change this to mass email
             await notificationModel.sendToAllMessage(title,htmlmessage).then(function(result) {

                console.log(result.response);

            });
        };

        sendToAllMessage();

        const sendFPMtoTopic = async () => {   //send to all with hash
             await notificationModel.sendFPMtoTopic("2click",title,cleanmessage,"new message","new message").then(function(result) {

                console.log(result);

            });
        };

        sendFPMtoTopic();



      },

      sendFollowedCommentAllHyper:function(title,htmlmessage,cleanmessage){

        const sendToAllMessage = async () => {    //send to all mail  //change this to mass email
             await notificationModel.sendToFollowedCommentAllMessage(title,htmlmessage).then(function(result) {

                console.log(result.response);

            });
        };

        sendToAllMessage();

        const sendFPMtoTopic = async () => {   //send to all with hash
             await notificationModel.sendFPMtoTopic("followComment",title,cleanmessage,"new message","new message").then(function(result) {

                console.log(result);

            });
        };

        sendFPMtoTopic();



      },

      sendFollowedUserSingleHyper:function(title,htmlmessage,cleanmessage,fromUser){

        const sendToAllMessage = async () => {    //send to all mail  //change this to mass email
             await notificationModel.sendToFollowedUserSingleMessage(title,htmlmessage,fromUser).then(function(result) {

                console.log(result.response);

            });
        };

        sendToAllMessage();

        const sendFPMtoFollowUsers = async () => {   //send to all with hash
             await notificationModel.sendFPMtoFollowUsers(title,cleanmessage,"new message","new message",fromUser).then(function(result) {

                console.log(result);

            });
        };

        sendFPMtoFollowUsers();


      }

}
