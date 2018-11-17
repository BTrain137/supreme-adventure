require("dotenv").config();
const path = require("path")
    , express = require("express")
    , logger = require('morgan')
    , app = express()
    , PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure AWS SDK
const aws = require("aws-sdk");
const s3 = new aws.S3();
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = process.env.AWS_REGION;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.get("/engagement-photos", (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'engagement-photos.html'));
});

app.get("/wedding-photos", (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'wedding-photos.html'));
});

app.get('/place-engagement-photos', (req, res) =>{
  const params = {
    Bucket: process.env.S3_BUCKET,
    // MaxKeys: 2,
    Prefix: 'engagement-photos-thumbnail/'
  };

  s3.listObjects(params, (err, data) => {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }

    //TODO get list of thumbnails on s3
    //TODO store thumbnail url into MongoDB for load balancing
    console.log(data.Contents[0].Key);
  });
  res.send("hello world");
});

app.get('/engagement-thumbnail', (req, res) => {
  //TODO users get thumbnail URL from MongoDB
}); 

app.get('/wedding-upload', (req, res) => {
  const pictureName = req.query['file-name']
    .replace(/ /g, '-')
    .replace(/[<>]/g, '')
    .replace(/[{}]/g, '')
    .replace(/[{}]/g, '');

  const absoluteTime = new Date().getTime();
  const fileName = `wedding-photos/${absoluteTime}__${pictureName}`;
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }

    const returnData = {
      signedRequest: data,
      url: `https://s3.amazonaws.com/${S3_BUCKET}/${fileName}`
    };

    res.write(JSON.stringify(returnData));
    res.end();
  });
});

//test get list of photo from directory
app.get('/list-photos', (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    MaxKeys: 2,
    Prefix: 'wedding/'
  };

  s3.listObjects(params, (err, data) => {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    console.log(data.Contents[0].Key);
  });
  res.send("hello world");
});

//test to get single photo
app.get('/get-photos', (req, res) => {

  s3.getObject({Bucket: process.env.S3_BUCKET, Key: 'wedding/front-page-1.jpg'}, (err, data) => {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }

    console.log(data);
  });
  res.send("hello world");
});

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});