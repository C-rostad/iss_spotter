
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


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

    fetchISSFlyOverTimes(latitude, longitude, (error, response) => {
      if (error) {
        console.log("Error in FetchISSFlyOverTimes", error);
        return;
      }
      nextISSTimesForMyLocation(response, () => {
        for (const element of response) {
          const date = new Date(0);
          date.setUTCSeconds(element.risetime);
          console.log(`Next pass at ${date} for ${element.duration} seconds`);
        }

      });
    });

  });
});
