const thumb = require('node-thumbnail').thumb;

// thumb(options, callback);

thumb({
    source: 'real-photo/',
    destination: 'thumbnail-photo/',
    concurrency: 4,
    width: 400
}).then(function() {
    console.log('All done!');
}).catch(function(error){
    console.log('Error', error.toString());
});