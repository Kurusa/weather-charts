function generateHourlyTemperatureConfig(weatherData) {
    const hourlyData = weatherData.hourly.slice(0, 20);

    const labels = hourlyData.map(hour => new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Фактична температура',
                    data: hourlyData.map(hour => hour.temp),
                    borderColor: '#FF6B6B',
                    fill: false,
                },
                {
                    label: 'Відчувається як',
                    data: hourlyData.map(hour => hour.feels_like),
                    borderColor: '#4D96FF',
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
        },
    };
}