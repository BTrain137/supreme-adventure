/**
 * Reads all files in a directory and returns an array of the file name and content 
 *
 * @param { String }        dirName Directory name where files live
 * @param {requestCallback} cb      Array of objects with file names as key and content is value
 */
const readAllFiles = function(dirName, cb) {
  fs.readdir(`./${dirName}`, (err, files) => {
    if(err) throw err;

    const arrayOfPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        fs.readFile(`./${dirName}/${file}`, 'utf8', (err, data) => {
          if (err) throw err;
          let webPage = file.split(".")[0];
          resolve({ [webPage]: data });
        });
      });
    })
      
    Promise.all(arrayOfPromises).then(function(values) {
      cb(values);
    });
  });
}


/**
 * Returns the count of all pages hit
 * 
 * @param { String }        dirName Directory name of the files to be read
 * @param {requestCallback} cb      Count of all pages hit with page as key and count as value
 */

const fs = require("fs");

module.exports = function(dirName, cb) {
  readAllFiles(dirName, function(array){
    cb(array);
  });
}