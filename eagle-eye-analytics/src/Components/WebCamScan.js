import React, { Component } from 'react'
import AWS from 'aws-sdk'
import Webcam from 'react-webcam'
import Promise from 'bluebird'
import Button from '@material-ui/core/Button';


AWS.config.update({
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  region: 'us-east-1'
})

const rek = new AWS.Rekognition()
const s3 = new AWS.S3()

const lambda = new AWS.Lambda()

class WebCamScan extends Component {

  state = {
    eagleStart: false,
    urlsData: []
  }

  startEagleEye = () => {
    this.setState({ eagleStart: !this.state.eagleStart })
    let stopInterval = setInterval(() => {
      if(this.state.eagleStart){
        console.log('invoked')
        var params = {
          FunctionName: 'eagleeye-upload'
        }
        lambda.invoke(params, (err, data) => {
          if (err) throw err
          else console.log('invoked!')
        })
      }else{
        console.log('stop')
        clearInterval(stopInterval)
      }
    }, 1000)
  }

  downloadFaces = match => {
    return new Promise((resolve, reject) => {
      var params = { Bucket: 'engleeyebucket', Key: `${match}` };
      s3.getSignedUrl('getObject', params, function (err, url) {
        if (err) reject(err)
        else {
          if (match.startsWith('cam1')) {
            const data = {
              url,
              booth: 'booth1'
            }
            resolve(data)
          } else if (match.startsWith('cam2')) {
            const data = {
              url,
              booth: 'booth2'
            }
            resolve(data)
          } else if (match.startsWith('cam3')) {
            const data = {
              url,
              booth: 'booth3'
            }
            resolve(data)
          } else if (match.startsWith('cam4')) {
            const data = {
              url,
              booth: 'booth4'
            }
            resolve(data)
          }
          console.log('inside download', match)
        }
      });
    })
  }

  getBinary(encodedFile) {
    var base64Image = encodedFile.split("data:image/jpeg;base64,")[1];
    var binaryImg = atob(base64Image);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }

    var blob = new Blob([ab], {
      type: "image/jpeg"
    });

    return ab;
  }

  compareFaces = (targetImage, sourceImage) => {
    return new Promise((resolve, reject) => {
      const params = {
        SimilarityThreshold: 90,
        SourceImage: {
          Bytes: this.getBinary(sourceImage)
        },
        TargetImage: {
          S3Object: {
            Bucket: 'engleeyebucket',
            Name: targetImage
          }
        }
      }
      rek.compareFaces(params, async (err, data) => {
        if (err) reject(err)
        else {
          console.log(data)
          // No face matches
          if (data.FaceMatches.length === 0) {
            return
          } else { //face matches
            const data = await this.downloadFaces(targetImage)
            resolve(data)
          }
        }
      })
    })
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const sourceImage = this.webcam.getScreenshot();
    const s3 = new AWS.S3()
    const params = {
      Bucket: 'engleeyebucket'
    }
    s3.listObjectsV2(params, (err, data) => {
      if (err) throw err
      else {
        const images = data.Contents.map(obj => {
          return (obj.Key)
        })
        const urlData = images.map(async targetImage => {
          try {
            const data = await this.compareFaces(targetImage, sourceImage)
            return data
          } catch (err) {
            console.log('the error')
            console.log(err)
            throw err
          }
        })
        Promise.all(urlData)
          .then(urlData => {
            const urlsData = urlData.map(data => {
              return data
            })
            this.setState({ urlsData })
          })
      }
    })
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    }
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.startEagleEye}>Start Eagle Eye</Button>
        <Webcam
          audio={false}
          height={900}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={900}
          videoConstraints={videoConstraints}
        />
        <Button variant="outlined" color="primary" onClick={this.capture}>Scan Face</Button>
        {this.state.urlsData.map((data, i) => {
          if (data.url === null) {
            return
          } else {
            return (
              <div key={i}>
                <h1>{data.booth}</h1>
                <img alt='eagleeye' src={data.url} />
              </div>
            )
          }
        })}
      </div>
    )
  }

}


export default WebCamScan