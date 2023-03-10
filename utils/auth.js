// Authentication middleware for password hashing 
  const withAuth = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.user_id) {
      // If not, redirect the user to the login page
      res.redirect('/login');
    } else {
      // If the user is logged in, call the next function in the middleware chain
      next();
    }
  };
  
  module.exports = withAuth;
  