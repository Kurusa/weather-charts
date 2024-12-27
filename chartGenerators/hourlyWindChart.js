function generateHourlyWindConfig(weatherData) {
    const windData = weatherData.hourly.slice(0, 20);

    const labels = windData.map(hour => new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Швидкість вітру',
                    data: windData.map(hour => hour.wind_speed),
                    borderColor: '#FF6B6B',
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        fontSize: 8,
                    },
                },
            },
        },
    };
}