var request = require("request");
var plotly = require('plotly')("usaches", "HuUTBwnwPucXrvJ0obxI");
var arr = [];
var rem = [];
var dirt = [];
var teetime = [];
var counts = {};
var xaxis = [];

var arr2 = [];
var rem2 = [];
var dirt2 = [];
var teetime2 = [];
var counts2 = {};
var xaxis2 = [];

var arr3 = [];
var rem3 = [];
var dirt3 = [];
var teetime3 = [];
var counts3 = {};
var xaxis3 = [];

var arr4 = [];
var rem4 = [];
var dirt4 = [];
var teetime4 = [];
var counts4 = {};
var xaxis4 = [];
request("https://wzy74zfyd3.execute-api.us-east-1.amazonaws.com/latest", function (error, response, body) {
    if (!error && response.statusCode === 200) {
        for (var i = 0; i < JSON.parse(body).Faces.length; i++) {
            arr.push(JSON.parse(body).Faces[i].ExternalImageId);
        }
        for (var j = 0; j < arr.length; j++) {
            rem.push(arr[j].replace(/:/g, ""))
        }
        for (var o = 0; o < rem.length; o++) {
            dirt.push(rem[o].replace(/PM/g, ""));
        }
        dirt.sort(function (a, b) {
            return a - b
        });
        dirt.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        teetime = Object.values(counts);
        for (var t = 0; t < teetime.length; t++) {
            xaxis.push(t);
        }
//22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        request("https://wzy74zfyd3.execute-api.us-east-1.amazonaws.com/latest", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                for (var i = 0; i < JSON.parse(body).Faces.length; i++) {
                    arr2.push(JSON.parse(body).Faces[i].ExternalImageId);
                }
                for (var j = 0; j < arr2.length; j++) {
                    rem2.push(arr2[j].replace(/:/g, ""))
                }
                for (var o = 0; o < rem2.length; o++) {
                    dirt2.push(rem2[o].replace(/PM/g, ""));
                }
                dirt2.sort(function (a, b) {
                    return a - b
                });
                dirt2.forEach(function (x) {
                    counts2[x] = (counts2[x] || 0) + 1;
                });
                teetime2 = Object.values(counts2);
                for (var t = 0; t < teetime2.length; t++) {
                    xaxis2.push(t);
                }
                //33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                request("https://wzy74zfyd3.execute-api.us-east-1.amazonaws.com/latest", function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        for (var i = 0; i < JSON.parse(body).Faces.length; i++) {
                            arr3.push(JSON.parse(body).Faces[i].ExternalImageId);
                        }
                        for (var j = 0; j < arr3.length; j++) {
                            rem3.push(arr3[j].replace(/:/g, ""))
                        }
                        for (var o = 0; o < rem3.length; o++) {
                            dirt3.push(rem3[o].replace(/PM/g, ""));
                        }
                        dirt3.sort(function (a, b) { //Array now becomes [7, 8, 25, 41]
                            return a - b
                        });
                        dirt3.forEach(function (x) {
                            counts3[x] = (counts3[x] || 0) + 1;
                        });
                        teetime3 = Object.values(counts3);
                        for (var t = 0; t < teetime3.length; t++) {
                            xaxis3.push(t);
                        }
                        //44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
                        request("https://wzy74zfyd3.execute-api.us-east-1.amazonaws.com/latest", function (error, response, body) {
                            if (!error && response.statusCode === 200) {
                                for (var i = 0; i < JSON.parse(body).Faces.length; i++) {
                                    arr4.push(JSON.parse(body).Faces[i].ExternalImageId);
                                }
                                for (var j = 0; j < arr4.length; j++) {
                                    rem4.push(arr4[j].replace(/:/g, ""))
                                }
                                for (var o = 0; o < rem4.length; o++) {
                                    dirt4.push(rem4[o].replace(/PM/g, ""));
                                }
                                dirt4.sort(function (a, b) { //Array now becomes [7, 8, 25, 41]
                                    return a - b
                                });
                                dirt4.forEach(function (x) {
                                    counts4[x] = (counts4[x] || 0) + 1;
                                });
                                teetime4 = Object.values(counts4);
                                for (var t = 0; t < teetime4.length; t++) {
                                    xaxis4.push(t);
                                }
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
                                    x: xaxis2,
                                    y: teetime2,
                                    fill: "tonexty",
                                    type: "scatter",
                                    fillcolor: "pink",
                                    name: "test",
                                    maxpoints: 10000,
                                    dx: 5,
                                    size: 5
                                };
                                var trace3 = {
                                    x: xaxis3,
                                    y: teetime3,
                                    fill: "tonexty",
                                    type: "scatter",
                                    fillcolor: "blue",
                                    name: "test",
                                    maxpoints: 10000,
                                    dx: 5,
                                    size: 5
                                };
                                var trace4 = {
                                    x: xaxis4,
                                    y: teetime4,
                                    fill: "tonexty",
                                    type: "scatter",
                                    fillcolor: "red",
                                    name: "test",
                                    maxpoints: 10000,
                                    dx: 5,
                                    size: 5
                                };
                                var data = [trace1, trace2, trace3, trace4];
                                var graphOptions = {filename: "basic-area", fileopt: "overwrite"};
                                plotly.plot(data, graphOptions, function (err, msg) {
                                    console.log(msg);
                                });
                            }

                        })
                    }
                })
            }
        })
    }
});
