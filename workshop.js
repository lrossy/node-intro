var request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {

    var location = {
        url: 'http://api.open-notify.org/iss-now.json',
        json: true
    };

    var cbFn = function(response) {
        var formattedResponse = {};
        if(response && response.message === "success"){
            formattedResponse = {
                name: 'getIssPosition',
                lat: response.iss_position.latitude,
                lng: response.iss_position.longitude
            };
        }
        else{
            formattedResponse.message = response.message;
        }
        return formattedResponse;
    };

    return request(location)
        .then(cbFn);
        // .catch( (error) => error.error );
}

function getAddressPosition(address) {

    if(!address) return Promise.reject('Address required');

    const API_KEY = 'AIzaSyBXJdny-NywdTQk7UJQNI_BZIApH_MIsaU';
    var options = {
        uri: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'key=' + API_KEY,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    var cbFn = function(response) {
        if(response.status !== "OK" || response.results === undefined || response.results.length < 1 ){
            return {};
        }
        else{
            return {
                name: 'getAddressPosition',
                lat: response.results[0].geometry.location.lat,
                lng: response.results[0].geometry.location.lng
            };
        }
    };

    return request(options)
        .then(cbFn);
}

function getCurrentTemperatureAtPosition(position) {
    const API_KEY = 'c861dc54a43dcc5756a3b065d1c354e7';
    if(!position) return Promise.reject('lat and lng required: getCurrentTemperatureAtPosition({lat: 123, lng: 321})');

    var options = {
        uri: 'https://api.darksky.net/forecast/' + API_KEY + '/' + position.lat + ',' + position.lng,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    var cbFn = function(response, reject) {
        if(reject){
            console.error('reject',reject)
        }
        return {
            name: 'getCurrentTemperatureAtPosition',
            temperature: response.currently.temperature
        };
    };

    return request(options)
        .then(cbFn);
}

function getCurrentTemperature(address) {

    return getAddressPosition(address)
        .then(getCurrentTemperatureAtPosition)
        .then( result => {
                result.name = 'getCurrentTemperature';
                return result;
        });
}

function getDistanceFromIss(address) {

    var promises = [
        getAddressPosition(address),
        getIssPosition()
    ];

    return Promise.all(promises)
        .then( values => {
            return {
                name: 'getDistanceFromIss',
                distance:  getDistance(values[0], values[1])
            };
        });
}

module.exports = {
    getIssPosition,
    getAddressPosition,
    getCurrentTemperatureAtPosition,
    getCurrentTemperature,
    getDistanceFromIss
};