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
    Prefix: 'engagement-photos/'
  };

  s3.listObjects(params, (err, photos) => {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }

    //TODO get list of thumbnails on s3
    //TODO store thumbnail url into MongoDB for load balancing
    // console.log(photos.Contents[0].Key);
    const engagementPhotos = photos.Contents.map(photo => {
        return `https://s3.amazonaws.com/bryankim/${photo.Key}`
    });

    engagementPhotos.shift();
    res.json(engagementPhotos);
  });
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
  const weddingPhotoParams = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', weddingPhotoParams, (err, data) => {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }

    const returnData = {
      signedRequest: data,
      url: `https://s3.amazonaws.com/${S3_BUCKET}/${fileName}`
    };

    // res.write(JSON.stringify(returnData));
    // res.end();
    res.json(returnData);
  });
});

app.get('/engagement-upload', (req, res) => {
  const engagementPhotoParams = {
    //ACL: private | public-read | public-read-write | authenticated-read | aws-exec-read | bucket-owner-read | bucket-owner-full-control,
    ACL: "public-read",
    // Body — (Buffer, Typed Array, Blob, String, ReadableStream)
    // Body: new Buffer('...') || 'STRING_VALUE' || streamObject,
    Body: '', 
    Bucket: "examplebucket", 
    Key: "exampleobject"
  };
  s3.putObject(engagementPhotoParams, function(err, data) {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }

    /*
    data = {
      ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
      VersionId: "Kirh.unyZwjQ69YxcQLA8z4F5j3kJJKr"
    }
    */

    console.log(data);

    res.send('Uploaded photo');

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