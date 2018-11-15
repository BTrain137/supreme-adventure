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
const aws = require("aws-sdk")
    , S3_BUCKET = process.env.S3_BUCKET;

aws.config.region = process.env.AWS_REGION;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = 'wedding/' + req.query['file-name'];
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

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});