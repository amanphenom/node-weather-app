const request = require('request')

const forecast = (long, lat, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=de1f486c2ec279707da9bfc32b57927a&query=' + encodeURIComponent(lat) +',' + encodeURIComponent(long) + '&units=f'

    request({ url: weatherUrl, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service')
        }
        else if (body.error) {
            callback('Unable to find location')
        }
        else {
            const data = body
            const msg = `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} out. It feels like ${data.current.feelslike} out!!`
            callback(undefined, msg)
        }
    })
}

module.exports = forecast
