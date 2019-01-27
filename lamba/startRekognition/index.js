const AWS = require('aws-sdk')
const Promise = require('bluebird')
const rek = new AWS.Rekognition()

const faceDetect = img => {
  return new Promise((resolve, reject) => {
    const params = {
      Image: {
        S3Object: {
          Bucket: 'engleeyebucket',
          Name: `${img}`,
        }
      }
    }
    return rek.detectFaces(params, (err, data) => {
      if (err) reject(err)
      else{
        console.log(data)
      }
    })
  })
}

const labelDetect = img => {
  return new Promise((resolve, reject) => {
    const params = {
      Image: {
        S3Object: {
          Bucket: 'engleeyebucket',
          Name: `${img}`,
        }
      }
    }
    return rek.detectLabels(params, (err, data) => {
      if (err) reject(err, err.stack);
      else{
        console.log(data)
      }
    });
  })
}

const indexFaces = (img, index) =>{
   return new Promise((resolve, reject)=>{
    const params = {
      CollectionId: "rekImages",  
      ExternalImageId: `${index}`, 
      Image: {
       S3Object: {
        Bucket: "engleeyebucket", 
        Name: `${img}`
       }
      }
     }
    rek.indexFaces(params, (err, data)=>{
      console.log(data)
      if(err)  reject(err)
      else{
        console.log(data)
      }
    })
   })
}

const rekProcesses = [faceDetect, labelDetect, indexFaces]

exports.handler = async (event, context) => {
  try {
    return Promise.map(rekProcesses, async (process, index) => {
      const data = await process(event.Records[0].s3.object.key, index)
      return data
    },
      {
        concurrency: parseInt(process.env.CONCURRENCY, 10)
      })
  } catch (err) {
    console.log(err)
    console.log('some error')
    throw err
  }
}