/**
 * Logs how many times users hit a specific route
 * 
 * @param {string} file     Name of file appending too
 */

const fs = require("fs");

module.exports = function(file) {
  fs.readFile(`./userCountLogs/${file}.txt`, 'utf8', (err, data) => {
    if (err) {
      fs.writeFile(`./userCountLogs/${file}.txt`, 1, 'utf8', (err, data) => {
        if (err) throw err;
        console.log("Created new Log file")
      });
    }
    else {
      let number = +data;
      number+=1;
      fs.writeFile(`./userCountLogs/${file}.txt`, number, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(`The "data to append" was appended to file! ${file}`);
      });
    }
  });
}
