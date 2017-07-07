var request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
    var options = {
        uri: 'http://api.open-notify.org/iss-now.json',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    return request(options)
    .then(
        function(response) {
            // throw new Error('test error')
          // Parse as JSON
          // Return object with lat and lng
          if(response.message !== "success"){
            return {};
          }
          else{
            return {
              lat: response.iss_position.latitude,
              lng: response.iss_position.longitude
            };
          }
        }
    )
}

function getAddressPosition(address) {

    const API_KEY = 'AIzaSyBXJdny-NywdTQk7UJQNI_BZIApH_MIsaU';
    var options = {
        uri: 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' + API_KEY,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    return request(options)
        .then(
            function(response) {
                // throw new Error('test error')
                // Parse as JSON
                // Return object with lat and lng
                if(response.status !== "OK" || typeof response.results === undefined || response.results.length < 1 ){
                    return {};
                }
                else{
                    return {
                        lat: response.results[0].geometry.location.lat,
                        lng: response.results[0].geometry.location.lng
                    };
                }
            }
        )
}

function getCurrentTemperatureAtPosition(position) {
    var API_KEY = 'c861dc54a43dcc5756a3b065d1c354e7';


}

function getCurrentTemperature(address) {

}

function getDistanceFromIss(address) {

}

module.exports = {
    getIssPosition,
    getAddressPosition,
    getCurrentTemperatureAtPosition,
    getCurrentTemperature,
    getDistanceFromIss
};