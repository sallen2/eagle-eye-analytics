var request = require("request");

var arr=[];
request("https://wzy74zfyd3.execute-api.us-east-1.amazonaws.com/latest", function(error, response, body) {

        if (!error && response.statusCode === 200) {

            for (var i=0; i<JSON.parse(body).cam1.Faces.length; i++){
                console.log(JSON.parse(body).cam1.Faces[i].ImageId[i]);
                arr.push(JSON.parse(body).cam1.Faces[i].ImageId);
            }
            var counts = {};
            arr.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
            console.log("People in each photo:");
            console.log(counts)


            for (var i=0; i<JSON.parse(body).cam3.Faces.length; i++){
                console.log(JSON.parse(body).cam3.Faces[i].ImageId[i]);
                arr.push(JSON.parse(body).cam3.Faces[i].ImageId);
            }
            var counts = {};
            arr.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
            console.log("People in each photo:");
            console.log(counts)

        }
    }
);