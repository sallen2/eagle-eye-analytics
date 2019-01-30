const AWS = require('aws-sdk')
const Promise = require('bluebird')
const moment = require('moment')

const rek = new AWS.Rekognition()

const deleteFaces = (deleteIds, CollectionId) => {
  if (deleteIds.length === 0) {
    return 'Nothing Deleted!'
  } else {
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
}

const searchFaces = (FaceId, CollectionId, index)=>{
  return new Promise((resolve,reject)=>{
    console.log('inside of loop', FaceId)
    const params = {
      CollectionId,
      FaceId: `${FaceId}`,
      FaceMatchThreshold: 90,
    }
    rek.searchFaces(params, (err, data) => {
      if (err) throw(err, err.stack);
      else {
        // TODO: Break into another function to get all face ids back
        resolve(data.FaceMatches)
      };
    })
  })
}

const searchReturnFaces = async (faceIds, CollectionId) => {
  return new Promise(async (resolve, reject) => {
    const dataArr = faceIds.map(async (FaceId, index) => {
      console.log(FaceId)
      const data = await searchFaces(FaceId, CollectionId, index)
      console.log(data)
    })
  })
}

const indexFaces2 = (img, Bucket, CollectionId,num) => {
  return new Promise((resolve, reject) => {
    const time = moment().subtract(5, 'hours').format('LTS')
    const timestamp = time.replace(' ', '')
    console.log(CollectionId+num)
    const params = {
      CollectionId: CollectionId+num,
      ExternalImageId: `${timestamp}`,
      Image: {
        S3Object: {
          Bucket,
          Name: `${img}`
        }
      }
    }
    rek.indexFaces(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const indexFaces = async (img, Bucket, CollectionId,num) => {
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
        if (data.FaceRecords.length === 0) {
          return ('no face detected')
        } else {
          const faceIds = data.FaceRecords.map(faces => {
            return faces.Face.FaceId
          })
          try {
            const done = await indexFaces2(img, Bucket, CollectionId,num)
            console.log(done)
            /*
            The code below searches for similar faces returns the ids of those similar faces. The 
            ids are passed into the function deleteFaces. The function deleteFaces returns the ids of
            faces delete from the camera's Rekognition collection
  
            Theses function where added to eliminate duplication of faces in a camera's collection.
            So, if our upload lambda function is invoked once a second, similar faces will be deleted giving
            us an accurate representation of how many people came to each booth. 
            */
            console.log(faceIds)
            const deleteIds = await searchReturnFaces(faceIds, CollectionId)
            console.log(deleteIds)
            // TODO: Send to delete function
            // const data = await deleteFaces(deleteIds, CollectionId)
            resolve(data)
          } catch (err) {
            console.log(err)
            if (err) throw err
          }
        }
      }
    })
  })
}

exports.handler = async (event, context) => {
  const imgName = event.Records[0].s3.object.key
  console.log(imgName)
  try {
    let data2
    let bucketName = ''
    let CollectionId = ''
    let data
    switch (imgName) {
      case 'cam1.jpg':
        bucketName = 'cam1bucket'
        CollectionId = imgName.replace('.jpg', '');
        console.log(CollectionId)
        data = await indexFaces(imgName, bucketName, CollectionId,'1');
        return data;
      case 'cam2.jpg':
        bucketName = 'cam2bucket'
        CollectionId = imgName.replace('.jpg', '');
        data = await indexFaces(imgName, bucketName, CollectionId,'2');
        return data;
      case 'cam3.jpg':
        bucketName = 'cam3bucket'
        CollectionId = imgName.replace('.jpg', '');
        data = await indexFaces(imgName, bucketName, CollectionId,'3');
        return data;
      case 'cam4.jpg':
        bucketName = 'cam4bucket'
        CollectionId = imgName.replace('.jpg', '');
        data = await indexFaces(imgName, bucketName, CollectionId,'4');
        return data;
    }
  } catch (err) {
    console.log(err)
    console.log('some error')
    throw err
  }
}