const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33fc2a748c2002241a065d2d1b4f9e6c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url, json: true} , (error,{body}={}) => {
        if (error) {
            callback('Unable to connect to Weather Service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+". It is "+body.current.temperature+" degrees out. It feels like " + body.current.feelslike + " degrees")
        }
})
}


module.exports = forecast