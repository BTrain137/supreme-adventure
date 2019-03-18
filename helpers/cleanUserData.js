/**
 * Removes all brackets.
 * 
 * @param {Object}   mailOptions
 * @return {promise}
 */

module.exports = function(data) {
  let cleaned = data
      .replace(/[<>]/g, "")
      .replace(/[{}]/g, "")
      .replace(/[{}]/g, "");
 return cleaned;
}