const writeErrorToFile = require("./writeErrorToFile");
const nodeMailer = require("./nodeMailer");
const cleanUserData = require("./cleanUserData");
const userCountLog = require("./userCountLog");
const getUserCountsLog = require("./getUserCountsLog");

module.exports = {
    writeErrorToFile: function (file, message) {
        writeErrorToFile(file, message);
    },
    nodeMailer: function (subject, html)  {
        return nodeMailer(subject, html);
    },
    cleanUserData: function(data) {
        return cleanUserData(data);
    },
    userCountLog: function(file) {
        return userCountLog(file);
    },
    getUserCountsLog: function(dirName, cb) {
        getUserCountsLog(dirName, function(result){
            cb(result);
        });
    }
}