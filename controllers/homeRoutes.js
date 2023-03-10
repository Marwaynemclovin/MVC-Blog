// Import the Router class from Express
const router = require('express').Router();

// Import the User model from the models folder
const { User } = require('../models');

// Import the withAuth middleware from the utils folder
const withAuth = require('../utils/auth');

// Define a GET route for the homepage that requires authentication
router.get('/', withAuth, async (req, res) => {
  try {
    // Use the User model to find all user records, excluding the password column, and order by name in ascending order
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // Map the user data to an array of plain JavaScript objects
    const users = userData.map((project) => project.get({ plain: true }));

    // Render the homepage view with the users array and logged_in flag from the session
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If an error occurs, return an error response with status code 500 and the error message
    res.status(500).json(err);
  }
});

// Define a GET route for the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the login view
  res.render('login');
});

// Export the router for use in other files
module.exports = router;
