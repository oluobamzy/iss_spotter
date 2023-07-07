/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');


const fetchMyIP = function(callback) {
  let url = "https://api.ipify.org/?format=json";
  request.get(url,function(err,res,data) {
    if (err) {
      return callback(err,null);
      
    }
    if (res.statusCode !== 200) {
      const msg = `ststus code ${res.statusCode}`;
      callback(Error(msg),null);
      return;
    }

    let stringedData = JSON.parse(data);
    let ip = stringedData.ip;
    callback(null,ip);
     
     
  });
  // use request to fetch IP address from JSON API
};

const fetchCoordsByIP = function(ip,callback) {
  let  url = `http://ipwho.is/${ip}`;
  request.get(url,function(err,res,data) {
    if (err) {
      return callback(err,null);
    }

    let parsedBody = JSON.parse(data);

    if (!parsedBody.success) {
      const msg = `status code ${res.statusCode} for coods`;
      callback(Error(msg),null);
      return;
    }

    const {latitude , longitude} = parsedBody;

    callback(null, {latitude , longitude});

  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  let latitude = coords.latitude;
  let longitude = coords.longitude;
  let url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request.get(url,function(err,res,data) {
    if (err) {
      return callback(err,null);
    }
    let parsedImg = JSON.parse(data);
    if(!parsedImg.success){
      const msg = `status code ${res.statusCode} for flyOverTimes`
    }
    let flyOverTimes = parsedImg.response;
    callback(null,flyOverTimes);
  });
};

const nextISSTimesForMyLocation = function(callback){
     fetchMyIP((error,ip)=>{
      if(error){
       return callback(error,null);
      }
        fetchCoordsByIP(ip,(error,{latitude , longitude})=>{
          if(error){
           return callback(error,null);
          }
          fetchISSFlyOverTimes({latitude , longitude},function(error,flyOverTimes){
            if(error){
              return callback(error,null);
            }
            callback(null,flyOverTimes)
          })
        })
     })
}


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};