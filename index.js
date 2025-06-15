
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, longitude, latitude) => {
    if (error) {
      console.log("Error in fetchCoordsByIP", error);
      return;
    }
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    fetchISSFlyOverTimes(latitude, longitude, (response) => {
      console.log(response);
    });

  });
});
