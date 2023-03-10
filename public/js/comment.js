// Import necessary packages and files
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const Post = require('../../models/Post');

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new post using the data from the request body and the user ID from the session
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Send back the new post object as a JSON response
    res.status(200).json(newPost);
  } catch (err) {
    // If there was an error, send back a 500 status code and the error message
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
