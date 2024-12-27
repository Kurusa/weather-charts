function generateHourlyWindConfig(weatherData) {
    const hourlyData = weatherData.hourly.slice(0, 20);

    const labels = hourlyData.map(hour =>
        new Date(hour.dt).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})
    );

    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Швидкість вітру (м/c)',
                    data: hourlyData.map(hour => hour.wind_speed),
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderColor: '#FF6B6B',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    borderWidth: 1.5,
                },
                {
                    label: 'Пориви вітру (м/c)',
                    data: hourlyData.map(hour => hour.wind_gust || 0),
                    backgroundColor: 'rgba(77, 150, 255, 0.1)',
                    borderColor: '#4D96FF',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    borderWidth: 1.5,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    title: {
                        display: true,
                        text: 'Час доби',
                        color: '#444',
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        font: {
                            size: 8,
                        },
                    },
                }],
                yAxes: [{
                    title: {
                        display: true,
                        text: 'Швидкість вітру (м/с)',
                        color: '#444',
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                }],
            },
        },
    };
}

module.exports = { generateHourlyWindConfig };
