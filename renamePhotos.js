const fs = require('fs');
const folderName = process.argv[2];

const addZerosInFront = function() {
    fs.readdir(`./Wedding/${folderName}`, function(err, files){
        files.forEach(file => {
            const number = file.match(/\d+/)[0];
            if(number < 10) {
                let arr = file.split(number);
                arr.splice(1, 0, '00' + number);
                let renamed = arr.join('');
                fs.rename(`./Wedding/${folderName}/${file}`, `./Wedding/${folderName}/${renamed}`, (err) => {
                    if (err) throw err;
                    console.log(renamed + ' is complete!');
                });
            }
            else if(number < 100) {
                let arr = file.split(number);
                arr.splice(1, 0, '0' + number);
                let renamed = arr.join('');
                fs.rename(`./Wedding/${folderName}/${file}`, `./Wedding/${folderName}/${renamed}`, (err) => {
                    if (err) throw err;
                    console.log(renamed + ' is complete!');
                });
            }
        })
    });
}

const shorterName = function() {
    fs.readdir(`./real-photo`, function(err, files){
        files.forEach((file, i) => {
            let renamed = `photo-booth-${i}.jpg`;
            fs.rename(`./real-photo/${file}`, `./real-photo/${renamed}`, (err) => {
                if (err) throw err
                console.log(renamed + ' is complete!');
            });
        });
    })
}

shorterName();
