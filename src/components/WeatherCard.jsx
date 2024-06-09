import { Box, Card, CardContent, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

// eslint-disable-next-line react/prop-types
const WeatherCard = ({ weather, unit }) => {
    const temperatureUnit = unit === 'metric' ? '°C' : '°F';

    return (
        <Card className="weather-card">
            <CardContent>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography variant="h5">{weather.name}, {weather.sys.country}</Typography>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography variant="body2">{weather.weather[0].description}</Typography>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography variant="h6">{weather.main.temp}{temperatureUnit}</Typography>
                <Box className="details" sx={{ display: "grid", gap: 1 }}>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}><ThermostatIcon /> Feels like: {weather.main.feels_like}{temperatureUnit}</Box>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}><WaterIcon /> Humidity: {weather.main.humidity}%</Box>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}><AirIcon /> Wind Speed: {weather.wind.speed} m/s</Box>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}><WbSunnyIcon /> Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</Box>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}><WbTwilightIcon /> Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Box>
                </Box>
            </CardContent>
        </Card>
    );
};
export default WeatherCard;
