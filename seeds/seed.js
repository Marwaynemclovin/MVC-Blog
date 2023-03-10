// Import the Sequelize connection from the config folder
const sequelize = require('../config/connection');

// Import the User model from the models folder
const { User } = require('../models');

// Import the user data from the userData.json file
const userData = require('./userData.json');

// Define an asynchronous function to seed the database with user data
const seedDatabase = async () => {
  // Use Sequelize to synchronize the database and force a reset
  await sequelize.sync({ force: true });

  // Use the User model to bulk create the user data, with individual hooks and returning the data
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Exit the process with code 0
  process.exit(0);
};

// Call the seedDatabase function to seed the database
seedDatabase();
