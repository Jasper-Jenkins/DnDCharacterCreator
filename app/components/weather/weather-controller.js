/*import WeatherService from "./weather-service.js";

const _weatherService = new WeatherService();

function drawWeather() {
    console.log("THE WEATHER MAN SAYS:", _weatherService.Weather)
    let weather = _weatherService.Weather;

    var template = '';

    template += `
        <p> location: <span>${weather.city}</span></p>
        <p> temp: </p>
        <p> &#176K ${weather.kelvin}</p> 
        <p> &#176F ${weather.fahrenheit.toFixed(2)}</p>
        <p> &#176C ${weather.celsius}</p>
        <p> Sky: <span>${weather.weather}</span><img src="https://openweathermap.org/img/w/${weather.icon}.png"></p>
    		`
    document.getElementById('weather').innerHTML = template;
}

  export default class WeatherController {

	constructor() {
        _weatherService.addSubscriber('weather', drawWeather)
        _weatherService.getWeather()
     }

     chooseCity(e) {
         e.preventDefault()
         var form = e.target
         var cityName = {
             city: form.city.value 
         }
         form.reset()
         console.log("City name value from form input: ", cityName)
         _weatherService.getWeatherCityOfChoice(cityName)
     }

}
*/