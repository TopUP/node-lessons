const User              = require('../models/User');
const { hashPassword }  = require('../services/passwordService');

class AuthController {
    async register (req, res) {
        try {
            const user = await User.create({
                first_name  : req.body.first_name,
                last_name   : req.body.last_name,
                email       : req.body.email,
                password    : hashPassword(req.body.password),
            });

            return res.status(201).json(user);
        } catch (error) {
            console.error(error);
            return res.sendStatus(400);
        }
    }

    async login (req, res) {
        try {
            const user = await User.findOne({
                where: {email: req.body.email}
            });

            if (!user) {
                return res.status(401).json({
                    result  : false,
                    error   : 'Unauthorized (User not found)'
                });
            }

            if (user.password !== hashPassword(req.body.password)) {
                return res.status(401).json({
                    result  : false,
                    error   : 'Unauthorized (Bad credentials)'
                });
            }

            const generateToken = require('../services/tokens');
            const tokens = generateToken({
                id          : user.id,
                first_name  : user.first_name,
                last_name   : user.last_name,
            });

            return res.status(201).json({
                result          : true,
                user            : user,
                // access_token    : tokens.access_token,
                // refresh_token   : tokens.refresh_token
                ...tokens
            });
        } catch (error) {
            console.error(error);
            return res.sendStatus(400);
        }
    }

    async refreshToken(req, res) {

    }
}

module.exports = AuthController;
