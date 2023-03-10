const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
      // Use the Post model to create a new post with the data from the request body
      const newPost = await Post.create({
        ...req.body, // Spread operator to include all properties in the request body
        user_id: req.session.user_id, // Set the user_id to the user ID stored in the session
      });
  
      // Send back the new post object as a JSON response
      res.status(200).json(newPost);
    } catch (err) {
      // If there was an error, send back a 400 status code and the error message
      res.status(400).json(err);
    }
  });
  
// Route to update a blog post by ID
router.put('/:id', withAuth, async (req, res) => {
    try {
      // Use the Post model to update the post record with the specified ID and user ID
      const updatedPostData = await Post.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      // If the post record doesn't exist, return an error response with status code 404 and a message
      if (!updatedPostData) {
        res.status(404).json({ message: 'No blog post found with this id!' });
        return;
      }
  
      // If the post was updated successfully, return a success response with status code 200 and the updated post data
      res.status(200).json(updatedPostData);
    } catch (err) {
      // If an error occurs, return an error response with status code 500 and the error message
      res.status(500).json(err);
    }
  });
  
  // Route to delete a blog post by ID
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      // Use the Post model to destroy the post record with the specified ID and user ID
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      // If the post record doesn't exist, return an error response with status code 404 and a message
      if (!postData) {
        res.status(404).json({ message: 'No blog post found with this id!' });
        return;
      }
  
      // If the post was deleted successfully, return a success response with status code 200 and the deleted post data
      res.status(200).json(postData);
    } catch (err) {
      // If an error occurs, return an error response with status code 500 and the error message
      res.status(500).json(err);
    }
  });
  

  // Export the router for use in other files
  module.exports = router;
