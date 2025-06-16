const { nextISSTimesForMyLocation } = require("./iss_promised");

const printTimes = function(times) {
  for (const element of times) {
    const date = new Date(0);
    date.setUTCSeconds(element.risetime);
    console.log(`Next pass at ${date} for ${element.duration} seconds`);
  }
};

nextISSTimesForMyLocation()
  .then((times) => {
    printTimes(times);
  })
  .catch((error) => {
    console.log("it didnt work", error.message);
  });