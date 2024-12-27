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
            dt: Joi.string().isoDate().required(),
            temp: Joi.number().required(),
            feels_like: Joi.number().required(),
            wind_speed: Joi.number().required(),
            wind_gust: Joi.optional(),
        }).required().unknown(true),
        daily: Joi.array()
            .items(
                Joi.object({
                    dt: Joi.string().isoDate().required(),
                    sunrise: Joi.string().isoDate().required(),
                    sunset: Joi.string().isoDate().required(),
                    temp: Joi.object({
                        day: Joi.number().required(),
                    }).required().unknown(true),
                }).unknown(true)
            )
            .min(1)
            .required(),
        hourly: Joi.array()
            .items(Joi.object({
                dt: Joi.string().isoDate().required(),
                temp: Joi.number().required(),
                feels_like: Joi.number().required(),
                wind_speed: Joi.number().required(),
            }).unknown(true))
            .min(1)
            .required(),
    }).unknown(true)
})

module.exports = {chartRequestSchema};
