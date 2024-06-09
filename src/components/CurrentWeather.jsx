import { Card, CardContent, Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
function CurrentWeather({ data, unit }) {
    const temperatureUnit = unit === 'metric' ? '°C' : '°F';
    const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

    return (
        <Card sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", boxShadow: "2px 4px 12px #00000014" }}>
            <CardContent sx={{ padding: "24px" }}>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography variant="h4">{data.name}, {data.sys.country}</Typography>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography variant="h6">Temperature: {data.main.temp}{temperatureUnit}</Typography>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography variant="h6">Status: {data.weather[0].description}</Typography>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography variant="h6">Humidity: {data.main.humidity}%</Typography>
                {/* eslint-disable-next-line react/prop-types */}
                <Typography variant="h6">Wind Speed: {data.wind.speed} {windSpeedUnit}</Typography>
            </CardContent>
        </Card>
    );
}

export default CurrentWeather;
