import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Hook from './Components/Hook';
import Description from './Components/Description';
import Demo from './Components/Demo';
import WebCamScan from './Components/WebCamScan';
import Button from '@material-ui/core/Button';
import HowItWorks from './Components/HowItWorks';
import TheTeam from './Components/TheTeam';
import backupPlotly from './Assets/newplot.png';
import AWS from 'aws-sdk'
const lambda = new AWS.Lambda()
class App extends Component {

  state = {
    urlsData: [],
    showCam: false,
    refresh: 0
  }

  resetIframe = () => {
    this.setState({ refresh: this.state.refresh + 1 });
    console.log('invoked')
  }

  showCam = () => {
    this.setState({ showCam: !this.state.showCam })
  }

  refreshGraph = () => {
    var params = {
      FunctionName: 'graphrefresh'
    }
    lambda.invoke(params, (err, data) => {
      if (err) {
        console.log(err)
        throw err
      } else {
        this.resetIframe()
        console.log(data)
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Hook />
        <Description />
        <HowItWorks />
        <TheTeam />
        <Demo  refresh={this.state.refresh} />
        {/* <img src={backupPlotly} /> */}
        <div style={{ paddingLeft: '5%' }}>
          {this.state.showCam ? <WebCamScan refresh={this.resetIframe} /> : null}
        </div>
        <Button style={{ marginLeft: '46.2%', marginBottom: '5%' }} variant="outlined" color="primary" onClick={this.refreshGraph}>Refresh Graph</Button>
        <Button
          style={{ marginLeft: '47%', marginBottom: '5%' }}
          variant="outlined"
          onClick={this.showCam}
          color="primary">
          Toggle Cam
        </Button>
      </div>
    );
  }
}

export default App;
