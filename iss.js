const needle = require("needle");


const fetchMyIP = function(callback) {
  needle.get("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, body);
      return;
    } else if (body.length === 0) {
      callback(error, null);
    } else {
      callback(error, body.ip);
    }
    if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
  });
};






module.exports = { fetchMyIP };