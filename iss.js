const { error } = require("console");
const needle = require("needle");


const fetchMyIP = function(callback) {
  needle.get("https://api.ipify.org?format=json", (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (error) {
      callback(error, body);
      return;
    } else if (body.length === 0) {
      callback(error, null);
    } else {
      callback(error, body.ip);
    }

  });
};

const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (error) {
      callback(error, body);
      return;
    } else if (!body) {
      callback(error, null);
    } else {
      callback(error, body.longitude, body.latitude);
    }
  });
};

const fetchISSFlyOverTimes = function(latitude, longitude, callback) {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (error) {
      callback(error, response);
    } else if (!body) {
      callback(error, null);
    } else {
      callback(body.response);
    }

  });
};





module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };