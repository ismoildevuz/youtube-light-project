const { RegisterValidation } = require('../validation/register.validation')

module.exports.RegisterValidate = function (req, res, next) {
    const { error } = RegisterValidation(req.body);
    if (error) {
        return res.status(400).send({ msg: error.details[0].message })
    }
    next()
}