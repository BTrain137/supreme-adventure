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
aws.config.region = process.env.AWS_REGION;
S3_BUCKET = process.env.S3_BUCKET;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.get('/sign-s3', (req, res) => {
  const fileName = req.query['file-name'];
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
      return res.end();
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.get('/list-photos', (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    MaxKeys: 2
  };

  s3.listObjects(params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }

    console.log(data);
  });
  res.send("hello world");
});

app.get('/get-photos', (req, res) => {

  s3.getObject({Bucket: process.env.S3_BUCKET, Key: 'wedding/front-page-1.jpg'}, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }

    console.log(data);
  });
  res.send("hello world");
});

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});