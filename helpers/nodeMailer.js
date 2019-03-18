/**
 * Email contact us message to owner
 * 
 * @param {String}   subject  Subject line of the email
 * @param {String}   html     The body of email
 * @return {promise}
 */

const nodemailer = require("nodemailer");

module.exports = function (subject, html) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: subject,
      html: html
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err){
        reject(err);
      }
      else {
        resolve(info);
      }
    });
  });
}