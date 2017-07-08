var ws = require('./workshop');

// // ISS open-notify.org
ws.getIssPosition()
    .then(console.log, console.error);

// darksky
ws.getCurrentTemperatureAtPosition({lat: 37.8267, lng: -122.4233})
    .then(console.log, console.error);

// gmaps
ws.getAddressPosition('3 Place Ville Marie #401, Montreal, QC H3B 2E3')
    .then(console.log, console.error);

// gmaps then darksky
ws.getCurrentTemperature('3 Place Ville Marie #401, Montreal, QC H3B 2E3')
    .then(console.log, console.error);

ws.getDistanceFromIss('3 Place Ville Marie #401, Montreal, QC H3B 2E3')
    .then(console.log, console.error);

