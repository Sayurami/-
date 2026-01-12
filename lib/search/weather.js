// weatherService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getWeatherData = async (city) => {
    const apiKey = '1ad47ec6172f19dfaf89eb3307f74785'; // Replace with your actual API key
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message || 'Unable to fetch weather data');
        }

        return {
            cityName: data.name,
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            minTemperature: data.main.temp_min,
            maxTemperature: data.main.temp_max,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            rainVolume: data.rain ? data.rain['1h'] : 0,
            cloudiness: data.clouds.all,
            sunrise: new Date(data.sys.sunrise * 1000),
            sunset: new Date(data.sys.sunset * 1000),
        };
    } catch (error) {
        throw new Error('Unable to fetch weather data');
    }
};

module.exports = { getWeatherData };
