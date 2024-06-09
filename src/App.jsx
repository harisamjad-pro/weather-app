import { useState } from 'react';
import { Chip, useMediaQuery } from '@mui/material';
import { fetchCurrentWeather, fetchForecastWeather, fetchCurrentWeatherByCoords } from './utils/api';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import { Button, TextField, CircularProgress, Typography, Box, Grid } from '@mui/material';

function App() {
    const [city, setCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const [unit, setUnit] = useState('metric');
    const [loading, setLoading] = useState(false);

    const largeScreen = useMediaQuery('(min-width: 1025px)');
    const mediumScreen = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

    const fetchWeather = async (cityName, unitType) => {
        setLoading(true);
        try {
            const currentResponse = await fetchCurrentWeather(cityName, unitType);
            setCurrentWeather(currentResponse.data);
            const forecastResponse = await fetchForecastWeather(cityName, unitType);
            setForecastWeather(forecastResponse.data);
            setError(null);
        } catch (err) {
            setError('City not found. Please try again.');
            setCurrentWeather(null);
            setForecastWeather(null);
        }
        setLoading(false);
    };

    const handleSearch = async () => {
        fetchWeather(city, unit);
        setHistory([...history, city]);
    };

    const handleUnitChange = async () => {
        const newUnit = unit === 'metric' ? 'imperial' : 'metric';
        setUnit(newUnit);

        if (currentWeather) {
            fetchWeather(currentWeather.name, newUnit);
        }
    };

    const handleLocation = async () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const currentResponse = await fetchCurrentWeatherByCoords(latitude, longitude, unit);
                setCurrentWeather(currentResponse.data);
                const forecastResponse = await fetchForecastWeather(currentResponse.data.name, unit);
                setForecastWeather(forecastResponse.data);
                setError(null);
                setHistory([...history, currentResponse.data.name]);
            } catch (err) {
                setError('Location not found. Please try again.');
                setCurrentWeather(null);
                setForecastWeather(null);
            }
            setLoading(false);
        });
    };

    const handleClearHistory = () => {
        setHistory([]);
    };

    return (
        <Box
            sx={{
                padding: largeScreen ? "48px 96px" : mediumScreen ? "48px 48px" : "48px 24px",
                background: "#f5f5f7",
                minHeight: "100vh",
                color: "#111111",
            }}
        >
            <Typography variant="h2" gutterBottom align="center" sx={{ color: "#111111", marginBottom: "24px" }}>
                Weather App
            </Typography>
            <Box className="search-container" mt={6} mb={2}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city name"
                            variant="outlined"
                            size="small"
                            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            sx={{ backgroundColor: "#007BFF", color: "#fff", borderRadius: "8px" }}
                        >
                            Get Weather
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={handleUnitChange}
                            sx={{ backgroundColor: "#FF5722", color: "#fff", borderRadius: "8px" }}
                        >
                            {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleLocation}
                            sx={{ backgroundColor: "#4CAF50", color: "#fff", borderRadius: "8px" }}
                        >
                            Use My Location
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleClearHistory}
                            sx={{ backgroundColor: "#f44336", color: "#fff", borderRadius: "8px" }}
                        >
                            Clear History
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {loading && <CircularProgress />}
            {error && <Typography color="error" align="center">{error}</Typography>}
            {currentWeather && <CurrentWeather data={currentWeather} unit={unit} />}
            {forecastWeather && <ForecastWeather data={forecastWeather} unit={unit} />}
            <Box className="history-container" mt={8}>
                <Typography variant="h5" align="center">Search History</Typography>
                <Box mt={2} sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                    {history.map((item, index) => (
                        <Chip key={index} label={item} color="default" variant='outlined' />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default App;
