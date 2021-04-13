const Sequelize = require("sequelize");
const connection = require("../connection");
const User = require("./User");

const Project = connection.define("Project", {
  title: Sequelize.STRING
});

// Create UserProjects to relate Many to Many
Project.belongsToMany(User, {as: 'Users', through: 'UserProjects'});
User.belongsToMany(Project, {as: 'Projects', through: 'UserProjects'});

module.exports = Project;
