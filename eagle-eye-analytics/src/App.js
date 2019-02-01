import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Hook from './Components/Hook';
import Description from './Components/Description';
import AWS from 'aws-sdk'
import axios from 'axios'
AWS.config.update({
  secretAccessKey: 'd558DCqXF8DiY2NpTc47a7lymmWyhK7e0bzx8ipm',
  accessKeyId:'AKIAI5HVLVGAELST7MTQ',
  region: 'us-east-1'
})

const lambda = new AWS.Lambda()

const s3  = new AWS.S3()
const params = {
  Bucket: 'eagle-eye-testing2',
};
s3.listObjects(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});

// var request = require("request");
// var arr=[];
// request("https://wzy74zfyd3.execute-api.us-east-1.amazonaws.com/latest", function(error, response, body) {
//
//         if (!error && response.statusCode === 200) {
//
//
//             for (var i=0; i<JSON.parse(body).Faces.length; i++){
//                 // console.log(JSON.parse(body).Faces[i].ImageId);
//                 arr.push(JSON.parse(body).Faces[i].ImageId);
//             }
//             // console.log(arr);
//             var counts = {};
//             arr.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
//             console.log("People in each photo:");
//             console.log(counts)
//             // var unique = [...new Set(arr)];
//             // console.log(unique);
//             // for (var j=0; j<arr.length; j++){
//             //   unique.forEach(function(count){
//             //
//             //   })
//         }
//     }
// );

class App extends Component {
componentDidMount(){
  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
}

  render() {
    return (
      <div>
        <Header />
        <Hook />
      </div>
    );
  }
}

export default App;
