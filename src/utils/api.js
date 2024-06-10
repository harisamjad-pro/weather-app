import axios from 'axios';

const apiKey = 'API_KEY';

export const fetchCurrentWeather = (city, unit) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
};

export const fetchForecastWeather = (city, unit) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`);
};

export const fetchCurrentWeatherByCoords = (lat, lon, unit) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`);
};
