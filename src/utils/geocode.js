const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1hbnN1ZGFuIiwiYSI6ImNrYnFyc3k2NDFyaGgycXBvczBmZjRpenAifQ.WM9fBFejg42c4HJ5h5cfdw&limit=1'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocode service', undefined) // or dont pass undefined, it is passed by default
        }
        else if (body.features.length === 0) {
            callback('Unable to process search text', undefined)
        }
        else {
            const data = body
            const codes = {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            }
            callback(undefined, codes)
        }  
    })
}

module.exports = geocode