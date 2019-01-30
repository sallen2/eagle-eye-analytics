var request = require("request");
var plotly = require('plotly')("usaches", "HuUTBwnwPucXrvJ0obxI");
var arr=[];
var rem=[];
var dirt = [];
var teetime=[];
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
            // console.log("People in each photo:");

            console.log(counts)
            teetime = Object.values(counts);
            // console.log(teetime)
            var xaxis=[];
            for (var t =0; t<teetime.length; t++){
                xaxis.push(t);
            }


            // for (var r=0; r<dirt.length; r++){
            //     var teetime = [];
            //     teetime.push(counts[r]);
            // }
            // console.log(teetime)

// var unique = [...new Set(arr)];
// console.log(unique);
// for (var j=0; j<arr.length; j++){
//   unique.forEach(function(count){
//
//   })
        }
    console.log(xaxis, teetime)
    var trace1 = {
        x: xaxis,
        y: teetime,
        fill: "tozeroy",
        type: "scatter",
        fillcolor: "green",
        name: "PeopleCounting",
        maxpoints: 10000,
        dx: 5,
        size: 5
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6],
        y: [3, 5, 1, 7, 4, 4],
        fill: "tonexty",
        type: "scatter",
        fillcolor: "pink",
        name: "test",
        maxpoints: 10000,
        dx: 5,
        size: 5
    };
    var data = [trace1, trace2];
    var graphOptions = {filename: "basic-area", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
    });
    }
);
