const axios = require('axios')
const stream = require('stream')
const aws = require('aws-sdk');
const Promise = require('bluebird')
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

function uploadFromStream(s3, cam, Bucket) {
  var pass = new stream.PassThrough();
  var params = { Bucket, Key: `${cam.name}.jpg`, Body: pass };
  s3.upload(params, (err, data) => {
    if (err) throw new Error('oops something went wrong!')
    else console.log(data);
  });

  return pass;
}

const getDevices = () => {
  return axios({
    method: 'get',
    url: 'https://arlo.netgear.com/hmsweb/users/devices',
    headers: {
      Authorization: process.env.TOKEN
    },
  })
  .then(res => {
    return res.data.data.map(d => {
      const obj = {
        name: d.deviceName,
        imgURL: d.presignedLastImageUrl
      }
      return obj
      })
    })
}

exports.handler = async (event, context) => {
  try {
    return Promise.map(getDevices(), async cam => {
      if(cam.imgURL !== undefined){
        const response = await axios({
          method: 'get',
          url: cam.imgURL,
          responseType: 'stream'
        })
        let bucket = ''
        switch(cam.name){
          case 'cam1':
              bucket = 'cam1bucket'
            return response.data.pipe(uploadFromStream(s3, cam, bucket));
          case 'cam2':
              bucket = 'cam2bucket'
            return response.data.pipe(uploadFromStream(s3, cam, bucket));
          case 'cam3':
              bucket = 'cam3bucket'
            return response.data.pipe(uploadFromStream(s3, cam, bucket));
          case 'cam4':
              bucket = 'cam4bucket'
            return response.data.pipe(uploadFromStream(s3, cam, bucket));
        }
      }
    },{
        concurrency: parseInt(process.env.DOWNLOAD_CONCURRENCY, 10)
      })

  } catch (err) {
    console.log(err);
    console.log('some error!!');
    throw err;
  }
};