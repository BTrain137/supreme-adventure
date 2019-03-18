const writeErrorToFile = require("./writeErrorToFile");
const nodeMailer = require("./nodeMailer");
const cleanUserData = require("./cleanUserData");

module.exports = {
    writeErrorToFile: function (file, message) {
        writeErrorToFile(file, message);
    },
    nodeMailer: function (subject, html)  {
        return nodeMailer(subject, html);
    },
    cleanUserData: function(data) {
        return cleanUserData(data);
    }
}