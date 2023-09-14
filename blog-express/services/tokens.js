const jwt = require('jsonwebtoken');

const generateTokens = (payload) => {
    try {
        const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

        return {
            access_token    : jwt.sign(payload, JWT_SECRET,         {expiresIn: '30d'}),
            refresh_token   : jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '60d'}),
        }
    } catch (error) {
        throw(error);
    }
}

module.exports = generateTokens;
