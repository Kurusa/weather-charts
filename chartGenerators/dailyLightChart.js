function generateDailyLightConfig(weatherData) {
    const dailyForecast = weatherData.daily.slice(0, 7);

    const labels = dailyForecast.map(day => {
        const date = new Date(day.dt);
        return date.toLocaleDateString('uk-UA', { weekday: 'long' });
    });

    const nightBeforeSunrise = dailyForecast.map(day => {
        const startOfDay = new Date(day.dt).setHours(0, 0, 0, 0);
        const sunrise = new Date(day.sunrise).getTime();
        return parseFloat(((sunrise - startOfDay) / (1000 * 3600)).toFixed(2));
    });

    const daylightHours = dailyForecast.map(day => {
        const sunrise = new Date(day.sunrise).getTime();
        const sunset = new Date(day.sunset).getTime();
        return parseFloat(((sunset - sunrise) / (1000 * 3600)).toFixed(2));
    });

    const nightAfterSunset = dailyForecast.map(day => {
        const endOfDay = new Date(day.dt).setHours(23, 59, 59, 999);
        const sunset = new Date(day.sunset).getTime();
        return parseFloat(((endOfDay - sunset) / (1000 * 3600)).toFixed(2));
    });

    return {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Ніч перед сходом сонця',
                    data: nightBeforeSunrise,
                    backgroundColor: '#464646',
                    borderColor: '',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    borderWidth: 1.5,
                },
                {
                    label: 'Денний час',
                    data: daylightHours,
                    backgroundColor: '#FFA500',
                    borderColor: '',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    borderWidth: 1.5,
                },
                {
                    label: 'Ніч після заходу сонця',
                    data: nightAfterSunset,
                    backgroundColor: '#464646',
                    borderColor: '',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    borderWidth: 1.5,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    display: (context) => true,
                    color: '#000',
                    align: 'center',
                    anchor: 'center',
                    formatter: (value, context) => {
                        const datasetLabel = context.dataset.label;
                        const hours = Math.floor(value);
                        const minutes = Math.round((value - hours) * 60);
                        let duration = `${hours}г`;
                        if (minutes > 0) {
                            duration += ` ${minutes}хв`;
                        }
                        return duration;
                    },
                    font: (context) => {
                        if (context.dataset.label === 'Денний час') {
                            return {
                                size: 12,
                            };
                        }
                        return {
                            size: 10,
                        };
                    },
                },
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Дні тижня',
                        },
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Час доби (години)',
                        },
                        ticks: {
                            min: 0,
                            max: 24,
                            stepSize: 1,
                        },
                    },
                ],
            },
        },
    };
}

module.exports = { generateDailyLightConfig };
