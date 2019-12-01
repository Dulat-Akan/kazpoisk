
module.exports = {

     test:function(data){

       var test = '';

       return test;
    },

     checkCheckbox:function(data){

       var check = false;

       if(data.length > 0){
          check = true;
       }
       return check;

    },
     inputFilter:function(inputString){

       var data = this.cleanString(inputString);

       var check = "";

       if(data.length > 0){
          check = true;
       }
       return check;

    },


    cleanString:function(checkString){

            var validate = ["script","alert","php","xss","*","j&","#","X41","SRC","IMG","refresh","/html","base64","request","%","select","execute","document","-- -","--","<",">","concat","=","<script>","</script>","</"];

              //validate function

                  for(var i = 0;i < validate.length;i++){

                    var tt = checkString;
                    ttxt = tt.toString();
                    var xt = ttxt.indexOf(validate[i]);

                    if(xt >= 0){
                        checkString = " ";
                    }

                    }

                    for(var j = 0;j < checkString.length;j++){

                      var y = checkString[j];

                      if(y == validate[i]){
                        checkString[j] = " ";
                      }

                    }


                    return checkString;

          }


}
