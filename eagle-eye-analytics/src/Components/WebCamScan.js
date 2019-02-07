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
      if (this.state.eagleStart) {
        console.log('invoked')
        var params = {
          FunctionName: 'eagleeye-upload'
        }
        lambda.invoke(params, (err, data) => {
          if (err) throw err
          else console.log('invoked!')
        })
      } else {
        console.log('stop')
        clearInterval(stopInterval)
      }
    }, 12000)
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
            console.log(data)
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

  getImages = async (ImageId) => {
    const obj = {
      ImageId
    }
    const params = {
      ClientContext: new Buffer.from(JSON.stringify(obj)).toString('base64'),
      FunctionName: "getimages",
      InvocationType: "RequestResponse",
    };
    return new Promise((resolve, reject) => {
      lambda.invoke(params, (err, data) => {
        if (err) {
          console.log(err, err.stack)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  compareFaces = (CollectionId, sourceImage) => {
    return new Promise((resolve, reject) => {
      const params = {
        CollectionId,
        Image: {
          Bytes: this.getBinary(sourceImage)
        },
        MaxFaces: 5
      }
      rek.searchFacesByImage(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
          reject(err)
        }
        else {
          resolve(data)
        }
      })
    })
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  resetCollection = () => {
    var params = {
      FunctionName: 'resetcollection'
    }
    lambda.invoke(params, (err, data) => {
      if (err) {
        console.log(err)
        throw err
      } else {
        console.log(data)
      }
    })
  }

  capture = () => {
    const arr = ['cam11', 'cam22', 'cam33', 'cam44']
    console.log('captured')
    const sourceImage = this.webcam.getScreenshot();
    const s3 = new AWS.S3()
    Promise.all(arr.map(async CollectionId => {
      try {
        const data = await this.compareFaces(CollectionId, sourceImage)
        return data
      } catch (err) {
        console.log(err)
        throw err
      }
    }))
      .then(async data => {
        const ImageId = data.map(imageId => {
          if (imageId.FaceMatches.length === 0) {
            return []
          } else {
            return imageId.FaceMatches.map(faces => {
              return faces.Face.ImageId
            })
          }
        })
        try {
          console.log(ImageId)
          const data = await this.getImages(ImageId)
          return data
        } catch (err) {
          console.log(err)
          throw err
        }
      })
      .then(data => {
        const urlsData = data.Payload
        console.log(urlsData)
        // this.setState({ urlsData })
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
        <Button variant="outlined" color="primary" onClick={this.resetCollection}>Reset Collection</Button>
        <Button variant="outlined" color="primary" onClick={this.startEagleEye}>Start Eagle Eye</Button>
        <Webcam
          audio={false}
          height={700}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={700}
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