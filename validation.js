const Joi = require('joi');
const { DAILY_LIGHT, HOURLY_TEMPERATURE, HOURLY_WIND } = require('./chartTypes');

const chartRequestSchema = Joi.object({
    type: Joi.string()
        .valid(DAILY_LIGHT, HOURLY_TEMPERATURE, HOURLY_WIND)
        .required(),
    weatherData: Joi.object({
        daily: Joi.array()
            .items(
                Joi.object({
                    dt: Joi.number().required(),
                    sunrise: Joi.number().required(),
                    sunset: Joi.number().required(),
                })
            )
            .required(),
        hourly: Joi.array()
            .items(
                Joi.object({
                    dt: Joi.number().required(),
                    temp: Joi.number().required(),
                    feels_like: Joi.number().required(),
                    wind_speed: Joi.number().required(),
                })
            )
            .required(),
    }).required(),
});

module.exports = { chartRequestSchema };