var request = require("request");
var arr=[];
var rem=[];
var dirt = [];
request("https://wzy74zfyd3.execute-api.us-east-1.amazonaws.com/latest", function(error, response, body) {

        if (!error && response.statusCode === 200) {


            for (var i=0; i<JSON.parse(body).Faces.length; i++){
// console.log(JSON.parse(body).Faces[i].ImageId);
                arr.push(JSON.parse(body).Faces[i].ExternalImageId);


            }
            for (var j=0; j<arr.length; j++){
            rem.push(arr[j].replace(/:/g, ""))};
            for (var o=0; o<rem.length; o++){
             dirt.push(rem[o].replace(/PM/g, ""));
            }

            dirt.sort(function(a,b){ //Array now becomes [7, 8, 25, 41]
                return a - b
            })
            console.log(dirt);
// console.log(arr);
            var counts = {};
            dirt.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
            console.log("People in each photo:");

            console.log(counts)
// var unique = [...new Set(arr)];
// console.log(unique);
// for (var j=0; j<arr.length; j++){
//   unique.forEach(function(count){
//
//   })
        }
    }
);