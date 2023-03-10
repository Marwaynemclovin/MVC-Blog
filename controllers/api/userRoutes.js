// Import the Router class from Express
const router = require('express').Router();

// Import the User model from the models folder
const { User } = require('../../models');

// Define a POST route for user login
router.post('/login', async (req, res) => {
  try {
    // Use the User model to find a user record with the email specified in the request body
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If the user record doesn't exist, return an error response with status code 400 and a message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Use the checkPassword method on the user record to compare the login password with the hashed password in the database
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is invalid, return an error response with status code 400 and a message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If the password is valid, save the user ID and logged_in flag to the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      // Return a success response with the user data and a message
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // If an error occurs, return an error response with status code 400 and the error message
    res.status(400).json(err);
  }
});

// Define a POST route for user logout
router.post('/logout', (req, res) => {
  // If the user is logged in, destroy the session and return a success response with status code 204
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, return an error response with status code 404
    res.status(404).end();
  }
});

// Export the router for use in other files
module.exports = router;
