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
    urlsData: []
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

  compareFaces = image => {
    return new Promise((resolve, reject) => {
      const params = {
        SimilarityThreshold: 90,
        SourceImage: {
          S3Object: {
            Bucket: 'eagle-eye-testing',
            Name: 'me.jpeg'
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
          console.log(data)
          // No face matches
          if (data.FaceMatches.length === 0) {
            return
          } else { //face matches
            const data = await this.downloadFaces(image)
            resolve(data)
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
        const urlData = images.map(async img => {
          try {
            const data = await this.compareFaces(img)
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
    return (
      <div>
        <Header />
        <Hook />
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
    );
  }
}

export default App;
