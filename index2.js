const { nextISSTimesForMyLocation} = require('./iss_promised');


const printFlyOverTimes = function(flyOverTimes) {
  for (const willPassWhen of flyOverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(willPassWhen.risetime);
    const duration = willPassWhen.duration;
    console.log(`Next pass will be at ${datetime} for ${duration} seconds`);
  }
};

nextISSTimesForMyLocation()
  .then((flyOverTimes)=>{
    printFlyOverTimes(flyOverTimes);
  })
  .catch((error)=>{
    console.log("it didn't work ", error.message);
  });