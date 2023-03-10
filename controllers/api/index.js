// Import the Router class from Express
const router = require("express").router();

// Import the routes for users, posts, and comments
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

// Use the Router object to define routes for users, posts, and comments
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

// Export the router for use in other files
module.exports = router;
