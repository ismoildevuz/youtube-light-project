const jwt = require('jsonwebtoken')

const verify = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = {
    verify
}