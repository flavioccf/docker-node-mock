require("dotenv").config();
const Sequelize = require("sequelize");

const options = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  // logging: console.log,
  force: process.env.DB_FORCE_RESTART
}

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  options
);

(async () => {
  try {
    await connection.sync();
  } catch (error) {
    throw new Error(error);
  }
})();

module.exports = connection;