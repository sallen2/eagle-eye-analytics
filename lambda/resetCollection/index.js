const AWS = require('aws-sdk')
const Promise = require('bluebird')

const rek = new AWS.Rekognition()

const resetCollection = CollectionId => {
  return new Promise((resolve, reject) => {
    const params = {
      CollectionId,
    };
    rek.deleteCollection(params, (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(`inside delete ${CollectionId}`, data)
        rek.createCollection(params, (err, data)=>{
          if(err){
            console.log(err)
            reject(err)
          }else{
            console.log(`inside create ${CollectionId}`, data)
            resolve(data)
          }
        })
      }
    })
  })
}

const arr = ["cam1", "cam11", "cam2", "cam22", "cam3", "cam33", "cam4", "cam44"]

exports.handler = (event, context, callback) => {
  Promise.all(arr.map(async CollectionId => {
    try{
      const data = await resetCollection(CollectionId)
      console.log(data)
      return data
    }catch(err){
      console.log(err)
      throw err
    }
  }))
  .then(data=>{
    console.log("finished!",data)
  })
}