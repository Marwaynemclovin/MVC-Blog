const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user using the data from the request body
    const userData = await User.create(req.body);

    // Save the user ID, username, and logged_in flag to the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      // Send back the new user object as a JSON response
      res.status(200).json(userData);
    });
  } catch (err) {
    // If there was an error, send back a 400 status code and the error message
    res.status(400).json(err);
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    // Use the User model to find a user record with the username specified in the request body
    const userData = await User.findOne({ where: { username: req.body.username } 
    });

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

    // If the password is valid, save the user ID, username, and logged_in flag to the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      
      // Return a success response with the user data and a message
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // If there was an error, send back a 400 status code and the error message
    res.status(400).json(err);
  }
});

// Route to log out a user
router.post('/logout', async (req, res) => {
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

// Route for deleting a user by ID
router.delete("/user/:id", withAuth, async (req, res) => {
  try {
    // Delete the user with the specified ID
    const deleteUser = await User.destroy({ where: { user_id: req.body.user_id } });

    // If the user record doesn't exist, return an error response with status code 400 and a message
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the password is valid using the checkPassword method on the user record
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is invalid, return an error response with status code 400 and a message
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
  
  } catch (err) {
    // If there was an error, send back a 400 status code and the error message
    res.status(400).json(err);
  }
});

// Export the router for use in other files
module.exports = router;