require("dotenv").config();
const path = require("path")
    , express = require("express")
    , logger = require("morgan")
    , helper = require("./helpers/helper")
    , app = express()
    , data = require("./data/images.json")
    , PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Configure AWS SDK
const aws = require("aws-sdk");
const s3 = new aws.S3();
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = process.env.AWS_REGION;

app.get("/", (req, res) => {
  helper.userCountLog("index");
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.get("/count", (req, res) => {
  helper.getUserCountsLog("userCountLogs", function(result){
    res.json(result);
  });
});

app.get("/engagement-photos", (req, res) => {
  helper.userCountLog("engagement-photos");
  res.sendFile(path.join(__dirname, "./public", "engagement-photos.html"));
});

app.get("/wedding-photos", (req, res) => {
  helper.userCountLog("wedding-photos");
  res.sendFile(path.join(__dirname, "./public", "wedding-photos.html"));
});

app.get("/wedding-photos/:event", (req, res) => {
  const { event } = req.params;
  helper.userCountLog(`wedding-photos-${event}`);
  res.sendFile(path.join(__dirname, "./public/wedding-photos", `${event}.html`));
});

app.get("/videos", (req, res) => {
  helper.userCountLog("videos");
  res.sendFile(path.join(__dirname, "./public", "videos.html"));
});

app.get("/contact-me", (req, res) => {
  helper.userCountLog("contact-me");
  res.sendFile(path.join(__dirname, "./public", "contact-me.html"));
});

app.post("/contact-me", (req, res) => {
  const { name, email, message } = req.body
  const html = `<p> Name: ${helper.cleanUserData(name)} </p> 
              <p> Email: ${helper.cleanUserData(email)}</p>
              <p> Message: ${helper.cleanUserData(message)}</p>`;

  helper.nodeMailer("Bryan Kim - Contact Us", html)
    .then(info =>{
      res.sendStatus(200);
    })
    .catch(err => {
      helper.writeErrorToFile("ErrorContactMe.txt", err.toString());
      res.sendStatus(500);
    });
});

app.get("/get-engagement-photos-thumbnail", (req, res) =>{
  const params = {
    Bucket: process.env.S3_BUCKET,
    // MaxKeys: 2,
    Prefix: "engagement-thumbnail/"
  };

  s3.listObjects(params, (err, photos) => {
    if(err){
      helper.writeErrorToFile('ErrorGetEngagePhoto-thumbnail.txt', err.toString());
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

app.get("/photos/:album", (req, res) => {
  // "/get-wedding-photos-thumbnail/:folderName"
  // Has been moved to here to make less request to AWS
  const album = req.params.album;
  return res.json(data[album]);
});

app.get("/get-wedding-photos-thumbnail/:folderName", (req, res) =>{
  const params = {
    Bucket: process.env.S3_BUCKET,
    // MaxKeys: 2,
    Prefix: `${req.params.folderName}/`
  };

  s3.listObjects(params, (err, photos) => {
    if(err){
      helper.writeErrorToFile('ErrorGetThumbnail.txt', err.toString());
      return res.sendStatus(500);
    }

    const engagementPhotos = photos.Contents.map(photo => {
      return `https://s3.amazonaws.com/bryankim/${photo.Key}`
    });

    engagementPhotos.shift();
    res.json(engagementPhotos);
  });
});

app.post("/error", (req, res) => {
  helper.writeErrorToFile('ErrorClient.txt', req.body.toString());

  const html = `<p>Error! Client was not able to upload a photo</p>
                <p>Time: ${req.body.time}</p>
                <p>User Agent: ${req.body.userAgent}</p>`;

  helper.nodeMailer("Bryan - Kim: Error Client", html)
    .then(info =>{
      res.sendStatus(200);
    })
    .catch(err => {
      helper.writeErrorToFile("ErrorContactMe.txt", err.toString());
      res.sendStatus(500);
    });
});

app.get("/engagement-thumbnail", (req, res) => {
  //TODO users get thumbnail URL from MongoDB
});

app.get("/wedding-upload", (req, res) => {
  const pictureName = helper.cleanUserData(req.query["file-name"])
    .replace(/ /g, "-");

  const absoluteTime = new Date().getTime();
  const fileName = `guest-upload/${absoluteTime}__${pictureName}`;
  const fileType = req.query["file-type"];
  const weddingPhotoParams = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  };

  // TODO restrict file types to be upload
  s3.getSignedUrl("putObject", weddingPhotoParams, (err, data) => {
    if(err){
      helper.writeErrorToFile('ErrorPutObject.txt', err.toString());
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

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});