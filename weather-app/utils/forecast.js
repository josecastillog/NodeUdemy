const request = require('request')

const forecast = (latitud, longitud, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=2ff560b72b867529a05fcf9834aa318c&query=' + latitud + ',' + longitud + '&units=m'
    // console.log(url)
    request({url : url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike,
                description: response.body.current.weather_descriptions[0]
            })
        }
    })
    
}

module.exports = forecast