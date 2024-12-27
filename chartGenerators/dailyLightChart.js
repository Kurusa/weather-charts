function generateDailyLightConfig(weatherData) {
    const dailyForecast = weatherData.daily.slice(0, 7);

    const labels = dailyForecast.map(day => new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }));
    const nightBeforeSunrise = dailyForecast.map(day => (day.sunrise - day.dt) / 3600);
    const daylightHours = dailyForecast.map(day => (day.sunset - day.sunrise) / 3600);
    const nightAfterSunset = dailyForecast.map(day => (day.dt + 86400 - day.sunset) / 3600);

    return {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Ніч перед сходом сонця',
                    data: nightBeforeSunrise,
                    backgroundColor: '#464646',
                },
                {
                    label: 'Денний час',
                    data: daylightHours,
                    backgroundColor: '#FFA500',
                },
                {
                    label: 'Ніч після заходу сонця',
                    data: nightAfterSunset,
                    backgroundColor: '#464646',
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
                    formatter: (value) => {
                        const hours = Math.floor(value);
                        const minutes = Math.round((value - hours) * 60);
                        let string = `${hours} год. `;
                        if (minutes > 0) {
                            string += `${minutes} хв.`;
                        }
                        return string;
                    },
                    font: {
                        size: 12,
                    },
                },
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Дні тижня',
                    },
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Час доби',
                    },
                    min: 0,
                    max: 24,
                },
            },
        },
    };
}