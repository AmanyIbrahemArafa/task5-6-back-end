const url = "http://api.weatherapi.com/v1/current.json?key=f8a8d1ad4b494d97989103316260110&q=Damietta&aqi=no"


const request = require("request")
const url = "url"


request({ url }, (error, response))=> {

    console.log(response.body)

}