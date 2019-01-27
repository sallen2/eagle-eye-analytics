const AWS = require('aws-sdk')
const Promise = require('bluebird')

const rek = new AWS.Rekognition()

const getTracking = JobId => {
  return new Promise((resolve,reject)=>{
    rek.getPersonTracking({JobId},(err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const getFaceDetect = JobId => {
  return new Promise((resolve, reject)=>{
    rek.getFaceDetection({JobId},(err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const getLabelDetect = JobId => {
  return new Promise((resolve, reject)=>{
    rek.getLabelDetection({JobId},(err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const rekGetData = [getTracking, getFaceDetect, getLabelDetect]

exports.handler = (event, context) => {
  const body = JSON.parse(event.Records[0].body)
  try {
    return Promise.map(rekGetData, async get => {
      const data = await get(body.Message)
      console.log("The data", data)
      return data
    }, {
        concurrency: parseInt(process.env.CONCURRENCY, 10)
      })
  } catch (err) {
    console.log(err)
    console.log('useless error')
    throw err
  }
}