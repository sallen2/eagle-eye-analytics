const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const Promise = require('bluebird')

const getUrls = (ImageId) => {
  return new Promise((resolve, reject) => {
    const params = { Bucket: 'engleeyebucket', Key: `${ImageId}.jpg` };
    const url = s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(url)
        resolve(url)
      }
    });
  })
}

exports.handler = (event, context, callback) => {
  Promise.all(context.clientContext.ImageId.map(ImageIds => {
    return Promise.all(ImageIds.map(async imageId => {
      try {
        const url = await getUrls(imageId)
        console.log(url)
        return url
      } catch (err) {
        console.log(err)
        throw err
      }
    }))
      .then(url => {
        console.log(url)
        return url
      })
  }))
    .then(ImgIds => {
      console.log('the img ids', ImgIds)
      callback(null, ImgIds)
    })
}