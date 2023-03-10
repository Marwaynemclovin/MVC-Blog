// Import the Model and DataTypes classes from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the bcrypt library for password hashing
const bcrypt = require('bcrypt');

// Import the Sequelize connection from the config folder
const sequelize = require('../config/connection');

// Define a new class called User that extends the Model class
class User extends Model {
  // Define a method to check the password against the hashed password in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Use the User class to initialize a new table in the database
User.init(
  {
    // Define the id column with integer data type, primary key, and auto-increment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the name column with string data type and not null constraint
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the email column with string data type, not null constraint, and unique constraint
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // Define the password column with string data type, not null constraint, and minimum length of 8 characters
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // Define hooks to hash the password before creating a new user record
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    // Set the Sequelize connection and table options
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Export the User class for use in other files
module.exports = User;
