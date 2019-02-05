const AWS = require('aws-sdk')

const rek = new AWS.Rekognition()

const describeFaces1 = () => {
  return new Promise((resolve, reject) => {
    rek.describeCollection({
      CollectionId: 'cam11'
    }, (err, data) => {
      if (err) reject(err)
      else{
        console.log(data.FaceCount)
        resolve(data)
      } 

    })
  })
}

const describeFaces2 = () => {
  return new Promise((resolve, reject) => {
    rek.describeCollection({
      CollectionId: 'cam22'
    }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const describeFaces3 = () => {
  return new Promise((resolve, reject) => {
    rek.describeCollection({
      CollectionId: 'cam33'
    }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const describeFaces4 = () => {
  return new Promise((resolve, reject) => {
    rek.describeCollection({
      CollectionId: 'cam44'
    }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

exports.handler = async (event, context) =>{
  console.log(event)
  const data = {}
  data.cam1 = await describeFaces1()
  data.cam2 = await describeFaces2()
  data.cam3 = await describeFaces3()
  data.cam4 = await describeFaces4()
  response = {
    statusCode: 200,
    body: JSON.stringify(data)
  }
  return response
}

// saving configuration
// {
//   "lambda": {
//     "role": "describefaces-executor",
//     "name": "describefaces",
//     "region": "us-east-1"
//   },
//   "api": {
//     "id": "z324d5afl4",
//     "url": "https://z324d5afl4.execute-api.us-east-1.amazonaws.com/latest"
//   }
// }