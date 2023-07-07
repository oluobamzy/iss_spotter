const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
   
//   console.log('It worked! Returned IP:' , ip , typeof ip);
// });

// fetchCoordsByIP("174.112.151.38",(error, coordinates)=>{
//   if(error){

//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);

// });

// fetchISSFlyOverTimes({ "latitude": 45.4215296,
//   "longitude": -75.6971931},(error,data)=>{
//   if (error) {
//     console.log("it didnt work",error);
//     return;
//   }
//   console.log("it worked",data);
// });
const printFlyOverTimes = function(flyOverTimes){
    for (const willPassWhen of flyOverTimes){
      const datetime = new Date(0);
      datetime.setUTCSeconds(willPassWhen.risetime);
      const duration = willPassWhen.duration;
      console.log(`Next pass will be at ${datetime} for ${duration} seconds`);
    }
};

nextISSTimesForMyLocation((function(error,flyOverTimes){
  if(error){
    return console.log("i didnt work", error);
  }
  printFlyOverTimes(flyOverTimes);
}))


 