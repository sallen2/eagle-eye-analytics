import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Hook from './Components/Hook';
import WebCamScan from './Components/WebCamScan';
import Button from '@material-ui/core/Button';
import Description from './Components/Description';
import AWS from 'aws-sdk'

class App extends Component {

  state = {
    showCam: false,
  }

  showCam = () => {
    this.setState({ showCam: !this.state.showCam })
  }



  render() {
    return (
      <div>
        <Header />
        <Hook />
        <div style={{ marginLeft: '25.5%' }}>
          {this.state.showCam ? <WebCamScan /> : null}
        </div>
        <Button style={{ marginLeft: '44.5%' }} variant="outlined" onClick={this.showCam} color="primary">
          Toggle Cam
      </Button>
      </div>
    );
  }
}

export default App;
