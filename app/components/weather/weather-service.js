
/*
import Weather from '../../models/weather.js';

// @ts-ignore
    const weatherApi = axios.create({
        baseURL: "http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35",
        timeout: 3000
    });

let _state = {
	weather: {}
}

let _subscribers = {
	weather: []
}

function _setState(prop, data) {
	_state[prop] = data
    _subscribers[prop].forEach(fn => fn());
}

export default class WeatherService {
	get Weather() {
		return _state.weather
	}

	addSubscriber(prop, fn) {
		_subscribers[prop].push(fn)
	}

    getWeather() {
        console.log('Calling the Weatherman')
        weatherApi.get()
            .then(res => {
			_setState('weather', new Weather(res.data))
            })
        console.log("What are the subscribers: ", _subscribers)
    }

    getWeatherCityOfChoice(city) {

        let weatherBaseUrl = "http://api.openweathermap.org/data/2.5/weather?q="
        let cityApi = city.city
        let appId = "&&APPID=bd82255fd0a21fa1238699b9eda2ee35"

        let weatherApiUrl = weatherBaseUrl + cityApi + appId
        
        console.log("Weather api url: ", weatherApiUrl)
        weatherApi.get(weatherApiUrl).then(res => {
            _setState('weather', new Weather(res.data))
        })

    }
}
*/