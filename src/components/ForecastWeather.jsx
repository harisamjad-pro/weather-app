import { Box, Card, CardContent, Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
function ForecastWeather({ data, unit }) {
    const temperatureUnit = unit === 'metric' ? '°C' : '°F';

    return (
        <Box mt={8}>
            <Typography variant="h5" gutterBottom align="center">5-Day Forecast</Typography>
            <Box mt={2} sx={{
                display: "flex",
                overflowX: "auto",
                padding: "16px 16px",
                '::-webkit-scrollbar': {
                    display: 'none'
                },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                // backgroundColor: "crimson"
            }}>
                {/* eslint-disable-next-line react/prop-types */}
                {data.list.map((item, index) => (
                    <Box key={index} sx={{
                        flex: "0 0 auto",
                        width: "200px",
                        marginRight: "16px",
                    }}>
                        <Card sx={{ backgroundColor: "#B2FF80", borderRadius: "16px", boxShadow: "2px 4px 12px #00000014" }}>
                            <CardContent sx={{ padding: "24px" }}>
                                <Typography variant="h6">{new Date(item.dt_txt).toLocaleDateString()}</Typography>
                                <Typography variant="subtitle1">{new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                                <Typography variant="h6">{item.main.temp}{temperatureUnit}</Typography>
                                <Typography variant="h6">{item.weather[0].description}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default ForecastWeather;
