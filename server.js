const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiKey = '83a5fcfa01a18807f7afe989aa5cb971';

app.use(express.static('public'));

app.post('/weather', async (req, res) => {
  try {
    const city = req.body.city;
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getWeatherData(city) {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await axios.get(apiUrl);
  return response.data;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
