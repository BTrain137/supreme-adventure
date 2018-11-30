const thumb = require('node-thumbnail').thumb;

createThumbnail();
// reduceImage();

function createThumbnail() {
    thumb({
        source: 'real-photo/',
        destination: 'thumbnail-photo/',
        concurrency: 4,
        width: 400,
        suffix: '-thumbnail',
        overwrite: true
    }).then(function() {
        console.log('All done!');
    }).catch(function(error) {
        console.log('Error', error.toString());
    }); 
}

function reduceImage(params) {
    thumb({
        source: 'real-photo/',
        destination: 'thumbnail-photo/',
        concurrency: 4,
        width: 800,
        suffix: ''
    }).then(function() {
        console.log('All done!');
    }).catch(function(error) {
        console.log('Error', error.toString());
    });    
}

