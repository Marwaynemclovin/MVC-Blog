// Import the Model and DataTypes classes from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the connection to the database
const sequelize = require('../config/connections');

// Define a Comment model that extends the Sequelize Model class
class Comment extends Model {}

// Initialize the Comment model with the table schema and options
Comment.init (
    {
        // Define the 'id' column as an auto-incrementing integer primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Define the 'body' column as a non-null string
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Define the 'date_created' column as a non-null integer with a default value of the current timestamp
        date_created: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        // Define the 'user_id' column as an integer that references the 'id' column in the 'user' table
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
    },
    {
        // Pass in the connection to the database
        sequelize,
        // Disable timestamps for the model (i.e. 'createdAt' and 'updatedAt' columns)
        timestamps: false,
        // Set the table name to 'comment' (instead of the default 'comments')
        freezeTableName: true,
        // Use underscores for column names (i.e. 'date_created', instead of 'dateCreated')
        underscored: true,
        // Set the model name to 'comment' (instead of the default 'Comment')
        modelName: 'comment'
    }
);

// Export the Comment model for use in other files
module.exports = Comment;
