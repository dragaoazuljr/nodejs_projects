const request = require('request');
const fs = require('fs');

var geocodeAddress = (address) => {
  return new Promise ((resolve, reject) => {
    var key = fetchKey().key
    var urlg = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`

  if (key) {

    request({
      url: urlg,
      json: true,
      proxy: "http://CPTM%5Cdanillom:Cptm0004@iraque.cptm.info:80/"
    }, (error, response, body) => {

      if(error){
        reject("Unable to connect to internet")
      }else if (body.status === "ZERO_RESULTS") {
        reject("None Adress Founc")
      }else if(body.status === "OK"){

        var lat = body.results[0].geometry.location.lat;
        var lng = body.results[0].geometry.location.lng;

        resolve({
          Address:body.results[0].formatted_address,
          Latitude:lat,
          Longitude:lng
        });


      }else{
        console.log(JSON.stringify(body, undefined, 2));
        console.log(error);
        //console.log(response);

        }

      });
    }
  })
};


var fetchKey = () => {
  try {
    var keyString = fs.readFileSync('../weather-app/google.json');
    return JSON.parse(keyString);
  } catch (e) {
    console.log('failed read key');
    return false
  } finally {

  }
};

geocodeAddress("r. terra roxa 59 cajamar sao paulo").then((result) => {
  console.log(`Address: ${result.address}`);
  console.log(`Latitude: ${result.latitude}`);
  console.log(`Longitude: ${result.longitude}`);
},(error) => {
  console.log(error);
});
