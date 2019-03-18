/**
 * Write Error to error file locally
 * 
 * @param {string} file     Name of file appending too
 * @param {string} message  The message to be appended
 */

const fs = require("fs");

module.exports = function(file, message) {
  let timeNow = new Date();
  let errorMsg = `${timeNow.toString()} \n ${message} \n\n`;
  fs.appendFile(`./errorLogs/${file}`, errorMsg, (err) => {
    // if (err) throw err;
    console.log(`The "data to append" was appended to file! ${file}`);
  });
}
