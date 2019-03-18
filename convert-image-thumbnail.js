const thumb = require('node-thumbnail').thumb;

createThumbnail()
    .then((result) => {
        reduceImage();
    })
    .catch((error) => {
        console.log(error);
    });

function createThumbnail() {
    return new Promise((resolve, reject) => {
        thumb({
            source: 'real-photo/',
            destination: 'thumbnail-photo/',
            concurrency: 4,
            width: 400,
            suffix: '-thumbnail',
            overwrite: true
        }).then(function() {
            console.log('All done!');
            resolve();
        }).catch(function(error) {
            // console.log('Error', error.toString());
            reject(error.toString());
        }); 
    });
}

function reduceImage() {
    thumb({
        source: 'real-photo/',
        destination: 'reduced-photo/',
        concurrency: 4,
        width: 800,
        suffix: ''
    }).then(function() {
        console.log('All done!');
    }).catch(function(error) {
        console.log('Error', error.toString());
    });    
}

