const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, {
    as          : 'posts',
    foreignKey  : 'user_id',
    sourceKey   : 'id',
});

Post.belongsTo(User, {
    as          : 'user',
    foreignKey  : 'user_id',
    sourceKey   : 'id',
});

module.exports = { }
