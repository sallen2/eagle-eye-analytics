import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Hook from './Components/Hook';
import Description from './Components/Description';
import Demo from './Components/Demo';
import WebCamScan from './Components/WebCamScan';
import Button from '@material-ui/core/Button';

class App extends Component {

  state = {
    urlsData: [],
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
        <Description />
        <Demo />
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
