var ws = require('./workshop.js');

// console.log('getIssPosition: ', ws.getIssPosition());

// ws.getIssPosition().then(function(resolve){
//     console.log('resolve', resolve);
// })
//     .catch( (e) =>{
//         console.log('some err:', e)
//     });

ws.getAddressPosition()
    .then(function(resolve){
        console.log('resolve', resolve);
    })
    .catch( (e) =>{
        console.log('some err:', e)
    });