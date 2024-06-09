import axios from 'axios';

const apiKey = '99f7bbd3afd9c43f63515f0555218493';

export const fetchCurrentWeather = (city, unit) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
};

export const fetchForecastWeather = (city, unit) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`);
};

export const fetchCurrentWeatherByCoords = (lat, lon, unit) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`);
};
