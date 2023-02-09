const Joi = require('joi')

exports.RegisterValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
    })
    return schema.validate(data);
}