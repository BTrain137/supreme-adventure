// Test to upload from server
app.get("/engagement-upload", (req, res) => {
  
  const engagementPhotoParams = {
    //ACL: private | public-read | public-read-write | authenticated-read | aws-exec-read | bucket-owner-read | bucket-owner-full-control,
    ACL: "public-read",
    // Body — (Buffer, Typed Array, Blob, String, ReadableStream)
    // Body: new Buffer("...") || "STRING_VALUE" || streamObject,
    Body: "", 
    Bucket: "examplebucket", 
    Key: "exampleobject"
  };
  s3.putObject(engagementPhotoParams, function(err, data) {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }

    //data = {
    //  ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
    //  VersionId: "Kirh.unyZwjQ69YxcQLA8z4F5j3kJJKr"
    //}

    console.log(data);
    res.send("Uploaded photo");

  });
});

//test get list of photo from directory
app.get("/list-photos", (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    MaxKeys: 2,
    Prefix: "wedding/"
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
app.get("/get-photos", (req, res) => {

  s3.getObject({Bucket: process.env.S3_BUCKET, Key: "wedding/front-page-1.jpg"}, (err, data) => {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }

    console.log(data);
  });
  res.send("hello world");
});
