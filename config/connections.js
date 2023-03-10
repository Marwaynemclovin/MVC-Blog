// Importing the Sequelize package
const Sequelize = require('sequelize');

// Importing dotenv package to load environment variables
require('dotenv').config();

let sequelize;

// Checking if JAWSDB_URL exists in the environment variables (in case of deployment on Heroku)
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL exists, create a new Sequelize instance with it
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL doesn't exist, create a new Sequelize instance with the local database credentials
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

// Exporting the Sequelize instance for use in other parts of the application
module.exports = sequelize;