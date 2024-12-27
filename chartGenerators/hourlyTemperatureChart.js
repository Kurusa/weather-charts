function generateHourlyTemperatureConfig(weatherData) {
    const hourlyData = weatherData.hourly.slice(0, 20);

    const labels = hourlyData.map(hour =>
        new Date(hour.dt * 1000).toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit',
        })
    );

    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Фактична температура',
                    data: hourlyData.map(hour => hour.temp),
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderColor: '#FF6B6B',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    borderWidth: 1.5,
                },
                {
                    label: 'Відчувається як',
                    data: hourlyData.map(hour => hour.feels_like),
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
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                        color: '#333',
                    },
                },
            },
            scales: {
                xScales: [{
                    title: {
                        display: true,
                        text: 'Час доби',
                        color: '#444',
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                }],
                yScales: [{
                    title: {
                        display: true,
                        text: 'Температура (°C)',
                        color: '#444',
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        stepSize: 1,
                        color: '#444',
                    },
                }],
            },
        },
    };
}


module.exports = {generateHourlyTemperatureConfig};
