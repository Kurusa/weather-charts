function generateDailyLightConfig(weatherData) {
    const dailyForecast = weatherData.daily.slice(0, 7);

    const labels = dailyForecast.map(day =>
        new Date(day.dt * 1000).toLocaleDateString('uk-UA', { weekday: 'long' })
    );

    const nightBeforeSunrise = dailyForecast.map(day => {
        const startOfDay = new Date(day.dt * 1000).setHours(0, 0, 0, 0) / 1000;
        return parseFloat(((day.sunrise - startOfDay) / 3600).toFixed(2));
    });

    const daylightHours = dailyForecast.map(day =>
        parseFloat(((day.sunset - day.sunrise) / 3600).toFixed(2))
    );

    const nightAfterSunset = dailyForecast.map(day => {
        const endOfDay = new Date(day.dt * 1000).setHours(23, 59, 59, 999) / 1000;
        return parseFloat(((endOfDay - day.sunset) / 3600).toFixed(2));
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
                    display: (context) => context.dataset.label === 'Денний час',
                    color: '#000',
                    align: 'center',
                    anchor: 'center',
                    formatter: (value) => `${value}h`,
                    font: {
                        size: 12,
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
