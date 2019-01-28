const AWS = require('aws-sdk')

const rek = new AWS.Rekognition()

const describeFaces = () => {
  return new Promise((resolve, reject) => {
    rek.describeCollection({
      CollectionId: 'cam1'
    }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

exports.handler = async (event, context) =>{
  console.log(event)
  const data = await describeFaces()
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