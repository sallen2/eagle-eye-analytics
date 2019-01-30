var request = require("request");
var plotly = require('plotly')("usaches", "HuUTBwnwPucXrvJ0obxI");
var arr=[];
var rem=[];
var dirt = [];
var teetime=[];
request("https://wzy74zfyd3.execute-api.us-east-1.amazonaws.com/latest", function(error, response, body) {

    if (!error && response.statusCode === 200) {

        console.log(JSON.parse(body).cam1);

    }
})