const AWS = require('aws-sdk')
const rek = new AWS.Rekognition()

const data = {}

const returnFaces1 = () => {
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

const returnFaces2 = () => {
  return new Promise((resolve, reject) => {
    var params = {
      CollectionId: "cam2",
    }
    rek.listFaces(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const returnFaces3 = () => {
  return new Promise((resolve, reject) => {
    var params = {
      CollectionId: "cam3",
    }
    rek.listFaces(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const returnFaces4 = () => {
  return new Promise((resolve, reject) => {
    var params = {
      CollectionId: "cam4",
    }
    rek.listFaces(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

exports.handler = async (event, context) => {
  data.cam1 = await returnFaces1()
  data.cam2 = await returnFaces2()
  data.cam3 = await returnFaces3()
  data.cam4 = await returnFaces4()
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  }
  return response
}