const User              = require("../models/User");
const { hashPassword }  = require('../services/passwordService');

class UsersController {
    static async getMe(req, res) {
        const user = await User.findByPk(req.authUser.id, {
            include: 'posts'
        });

        return res.json(user);
    }

    static async show(req, res) {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.sendStatus(404);
        }

        return res.json({
            id          : user.id,
            first_name  : user.first_name,
            last_name   : user.last_name,
        });
    }

    static async update(req, res) {
        if (req.params.id != req.authUser.id) {
            return res.sendStatus(403);
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.sendStatus(404);
        }

        user.first_name  = req.body.first_name;
        user.last_name   = req.body.last_name;
        user.email       = req.body.email;

        if (req.body.password) {
            user.password = hashPassword(req.body.password);
        }

        user.save();

        return res.json(user);
    }

    static async destroy(req, res) {
        if (req.params.id != req.authUser.id) {
            return res.sendStatus(403);
        }

        const user = await User.findByPk(req.params.id, {
            include: 'posts'
        });

        if (!user) {
            return res.sendStatus(404);
        }

        try {
            user.posts.forEach(async (post) => await post.destroy());
        } catch (error) {
            console.error(error);
            return res.sendStatus(400);
        }

        try {
            await user.destroy();
        } catch (error) {
            console.error('user.destroy error', error);
            return res.sendStatus(400);
        }

        return res.sendStatus(204);
    }
}

module.exports = UsersController;
