const Post          = require("../models/Post");

class PostsController {
    static async all(req, res) {
        const posts = await Post.findAll({
            include: 'user',
        });

        return res.json(posts);
    }

    static async allForUser(req, res) {
        const posts = await Post.findAll({
            where   : { user_id: req.params.user_id },
            include : 'user',
        });

        return res.json(posts);
    }

    static async create(req, res) {
        const post = new Post();
        const data = req.body;

        post.user_id    = req.authUser.id;
        post.title      = data.title;
        post.content    = data.content;
        post.preview    = data.preview;
        post.publish_at = data.publish_at;

        await post.save();

        return res.status(201).json(post);
    }

    static async show(req, res) {
        const post = await Post.findByPk(req.params.id, {
            include: 'user',
        });

        if (!post) {
            return res.sendStatus(404);
        }

        return res.json(post);
    }

    static async update(req, res) {
        const post = await Post.findByPk(req.params.id);

        if (post.user_id != req.authUser.id) {
            return res.sendStatus(403);
        }

        if (!post) {
            return res.sendStatus(404);
        }

        const data = req.body;

        post.title      = data.title;
        post.content    = data.content;
        post.preview    = data.preview;
        post.publish_at = data.publish_at;

        await post.save();

        return res.status(201).json(post);
    }

    static async destroy(req, res) {
        const post = await Post.findByPk(req.params.id);

        if (post.user_id != req.authUser.id) {
            return res.sendStatus(403);
        }

        if (!post) {
            return res.sendStatus(404);
        }

        post.destroy();

        return res.status(204).send();
    }
}

module.exports = PostsController;
