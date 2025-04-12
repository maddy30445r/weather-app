const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/weather', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
console.log(city)
        const weatherData = {
            temperature: response.data.main.temp,
            condition: response.data.weather[0].main,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name
        };

        res.json(weatherData);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.status(500).json({ error: 'Error fetching weather data' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 