import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Hook from './Components/Hook';
import Description from './Components/Description';
import AWS from 'aws-sdk'
import Promise from 'bluebird'

AWS.config.update({
  secretAccessKey: 'd558DCqXF8DiY2NpTc47a7lymmWyhK7e0bzx8ipm',
  accessKeyId: 'AKIAI5HVLVGAELST7MTQ',
  region: 'us-east-1'
})

const rek = new AWS.Rekognition()
const s3 = new AWS.S3()
// const lambda = new AWS.Lambda()

// // setInterval(()=>{
// //   var params = {
// //     FunctionName: 'eagleeye-upload'
// //   }
// //   lambda.invoke(params,(err, data)=>{
// //     if(err) throw err
// //     else console.log('invoked!')
// //   })
// // },1000)

class App extends Component {

  state = {
    urls: []
  }

  downloadFaces = (match) => {
    return new Promise((resolve, reject) => {
      var params = { Bucket: 'engleeyebucket', Key: `${match}` };
      s3.getSignedUrl('getObject', params, function (err, url) {
        if (err) reject(err)
        else {
          resolve(url)
        }
      });
    })
  }

  compareFaces = image => {
    return new Promise((resolve, reject) => {
      const params = {
        SimilarityThreshold: 90,
        SourceImage: {
          S3Object: {
            Bucket: 'eagle-eye-testing',
            Name: 'willsmithtest.jpg'
          }
        },
        TargetImage: {
          S3Object: {
            Bucket: 'engleeyebucket',
            Name: image
          }
        }
      }
      rek.compareFaces(params, async (err, data) => {
        if (err) reject(err)
        else {
          if (data.FaceMatches.length === 0) {
            return
          } else {
            const url = await this.downloadFaces(image)
            resolve(url)
          }
        }
      })
    })
  }

  componentDidMount() {
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
        const url = images.map(async img => {
          console.log(img)
          try {
            const url = await this.compareFaces(img)
            return url
          } catch (err) {
            console.log('the error')
            console.log(err)
            throw err
          }
        })
        Promise.all(url)
        .then(urls=>{
          console.log(urls)
          this.setState({urls})
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Hook />
        {this.state.urls.map((url,i) => {
          if (url === null) {
            return
          } else {
            return <img key={i} alt='eagleeye' src={url} />
          }
        })}
      </div>
    );
  }
}

export default App;
