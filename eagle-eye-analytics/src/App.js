import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Websocket from 'react-websocket';
import Header from './Components/Header';
import Hook from './Components/Hook';
import Description from './Components/Description';

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

  logStuff = data =>{
    console.log(data)
  }

  handleOpen()  {
    alert("connected:)");
  }

  getData = (message) =>{
    this.refWebSocket.sendMessage(message);
  }

  render() {
    return (
      <div>
        <Header />
        <Hook />
        <Description />

      {/* <button onClick={()=>{this.getData({"action":"getdata"})}}>test</button>
        <Websocket url='wss://3un8zfqg4l.execute-api.us-east-1.amazonaws.com/beta'
              onMessage={this.logStuff} onOpen={this.handleOpen} ref={Websocket => {
                this.refWebSocket = Websocket;
              }}/> */}
      </div>
    );
  }
}

export default App;
