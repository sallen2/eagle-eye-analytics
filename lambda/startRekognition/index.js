const AWS = require('aws-sdk')
const Promise = require('bluebird')
const moment = require('moment')

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
      else {
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
      else {
        console.log(data)
      }
    });
  })
}

const deleteFaces = (deleteIds, CollectionId) => {
  return new Promise((resolve, reject) => {
    const params = {
      CollectionId,
      FaceIds: deleteIds
    }
    rek.deleteFaces(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const searchFaces = (faceIds, CollectionId) => {
  return new Promise((resolve, reject) => {
    resolve(faceIds.map(FaceId => {
      const params = {
        CollectionId,
        FaceId,
        FaceMatchThreshold: 90,
      }
      rek.searchFaces(params, (err, data) => {
        if (err) reject(err, err.stack);
        else {
          return data.FaceMatches.map(faces => {
            return faces.Face.FaceId
          })
        };
      })
    }))
  })
}

const indexFaces = async (img, Bucket, CollectionId) => {
  return new Promise((resolve, reject) => {
    const time = moment().subtract(5, 'hours').format('LTS')
    const timestamp = time.replace(' ', '')
    const params = {
      CollectionId,
      ExternalImageId: `${timestamp}`,
      Image: {
        S3Object: {
          Bucket,
          Name: `${img}`
        }
      }
    }
    rek.indexFaces(params, async (err, data) => {
      if (err) reject(err)
      else {
        const faceIds = data.FaceRecords.map(faces => {
          return faces.Face.FaceId
        })
        try {
          /*
          The code below searches for similar faces returns the ids of those similar faces. The 
          ids are passed into the function deleteFaces. The function deleteFaces returns the ids of
          faces delete from the camera's Rekognition collection

          Theses function where added to eliminate duplication of faces in a camera's collection.
          So, if our upload lambda function is invoked once a second, similar faces will be deleted giving
          us an accurate representation of how many people came to each booth.
          TODO: NEED TO DEPOLY LAMBDA AND TEST THIS OUT 
          */
          const deleteIds = await searchFaces(faceIds, CollectionId)
          const data = await deleteFaces(deleteIds, CollectionId)
          resolve(data)
        } catch (err) {
          console.log(err)
          if (err) throw err
        }
      }
    })
  })
}

exports.handler = async (event, context) => {
  const imgName = event.Records[0].s3.object.key
  console.log(imgName)
  try {
    let bucketName = ''
    let CollectionId = ''
    let data
    switch (imgName) {
      case 'cam1.jpg':
        bucketName = 'cam1bucket'
        CollectionId = imgName.replace('.jpg', '');
        data = await indexFaces(imgName, bucketName, CollectionId);
        return data;
      case 'cam2.jpg':
        bucketName = 'cam2bucket'
        CollectionId = imgName.replace('.jpg', '');
        data = await indexFaces(imgName, bucketName, CollectionId);
        return data;
      case 'cam3.jpg':
        bucketName = 'cam3bucket'
        CollectionId = imgName.replace('.jpg', '');
        data = await indexFaces(imgName, bucketName, CollectionId);
        return data;
      case 'cam4.jpg':
        bucketName = 'cam4bucket'
        CollectionId = imgName.replace('.jpg', '');
        data = await indexFaces(imgName, bucketName, CollectionId);
        return data;
    }
  } catch (err) {
    console.log(err)
    console.log('some error')
    throw err
  }
}