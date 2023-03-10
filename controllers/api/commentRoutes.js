// Import the Router class from Express
const router = require('express').Router();

// Import the withAuth middleware function from the utils folder
const withAuth = require('../../utils/auth');

// Define a POST route for creating a new post with authenticated access
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new post using the data from the request body and the user ID from the session
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Send back the new post object as a JSON response with a 200 status code
    res.status(200).json(newPost);
  } catch (err) {
    // If there was an error, send back a 500 status code and the error message as a JSON response
    res.status(500).json(err);
  }
});

// Export the router for use in other files
module.exports = router;
