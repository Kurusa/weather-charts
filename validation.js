const Joi = require('joi');
const {DAILY_LIGHT, HOURLY_TEMPERATURE, HOURLY_WIND} = require('./chartTypes');

const chartRequestSchema = Joi.object({
    type: Joi.string()
        .valid(DAILY_LIGHT, HOURLY_TEMPERATURE, HOURLY_WIND)
        .required(),
    weatherData: Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        timezone: Joi.string().required(),
        timezone_offset: Joi.number().required(),
        current: Joi.object({
            dt: Joi.number().required(),
            temp: Joi.number().required(),
            feels_like: Joi.number().required(),
            wind_speed: Joi.number().required(),
            wind_gust: Joi.number().required(),
        }).required().unknown(true),
        daily: Joi.array()
            .items(
                Joi.object({
                    dt: Joi.number().required(),
                    sunrise: Joi.number().required(),
                    sunset: Joi.number().required(),
                    temp: Joi.object({
                        day: Joi.number().required(),
                    }).required().unknown(true),
                }).unknown(true)
            )
            .min(1)
            .required(),
        hourly: Joi.array()
            .items(Joi.object({
                dt: Joi.number().required(),
                temp: Joi.number().required(),
                feels_like: Joi.number().required(),
                wind_speed: Joi.number().required(),
            }).unknown(true))
            .min(1)
            .required(),
    }).unknown(true)
})

module.exports = {chartRequestSchema};
