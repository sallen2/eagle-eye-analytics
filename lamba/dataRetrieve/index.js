const AWS = require('aws-sdk')
const rek = new AWS.Rekognition()

const returnFaces = () => {
  return new Promise((resolve, reject) => {
    var params = {
      CollectionId: "cam1",
    }
    rek.listFaces(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

}

exports.handler = async (event, context) => {
  const data = await returnFaces()
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  }
  return response
}