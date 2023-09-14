require('dotenv').config({});

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
    try {
        const passedToken   = req.headers['authorization'].split(' ')[1];
        const payloadUser   = jwt.verify(passedToken, JWT_SECRET);

        if (payloadUser) {
            const User  = require('../../models/User');
            const user    = await User.findByPk(payloadUser.id);

            if (!user) {
                res.status(401).json({
                    result  : false,
                    error   : 'Unauthorized'
                });
            } else {
                req.authUser = payloadUser;

                return next();
            }
        } else {
            res.status(401).json({
                result  : false,
                error   : 'Unauthorized'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            result  : false,
            error   : 'Unauthorized'
        });
    }
}

module.exports = auth;
