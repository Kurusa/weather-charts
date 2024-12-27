const express = require('express');
const {StatusCodes} = require('http-status-codes');
const {chartRequestSchema} = require('./validation');
const app = express();
const port = 3000;
const QuickChart = require('quickchart-js');
const {DAILY_LIGHT, HOURLY_TEMPERATURE, HOURLY_WIND} = require("./chartTypes");
const {generateDailyLightConfig} = require('./chartGenerators/dailyLightChart');
const {generateHourlyTemperatureConfig} = require('./chartGenerators/hourlyTemperatureChart');
const {generateHourlyWindConfig} = require('./chartGenerators/hourlyWindChart');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/generate-chart', async (req, res) => {
    const {error, value} = chartRequestSchema.validate(req.body);

    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: error.details[0].message});
    }

    const {type, weatherData} = value;

    try {
        let config;
        switch (type) {
            case DAILY_LIGHT:
                config = generateDailyLightConfig(weatherData);
                break;
            case HOURLY_TEMPERATURE:
                config = generateHourlyTemperatureConfig(weatherData);
                break;
            case HOURLY_WIND:
                config = generateHourlyWindConfig(weatherData);
                break;
        }

        const chart = new QuickChart();
        chart.setConfig(config);
        const chartUrl = chart.getUrl();

        res.json({url: chartUrl});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Не вдалося згенерувати графік' + error.message});
    }
});

app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
