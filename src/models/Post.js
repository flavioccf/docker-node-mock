const Sequelize = require("sequelize");
const connection = require("../connection");
const User = require("./User");

const Post = connection.define("Post", {
  title: Sequelize.STRING,
  content: Sequelize.TEXT
});

Post.belongsTo(User, { as: "UserRef", foreignKey: 'userId'}); // RELATIONSHIP WITH USER MODEL
User.hasMany(Post, { as: "UserPosts", foreignKey: 'userId'}); // ONE TO MANY

module.exports = Post;
