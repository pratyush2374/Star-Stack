const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express();

// Initialize Passport.js and express-session
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Callback
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // After successful login, redirect to the frontend or dashboard
    res.redirect('http://localhost:3000/dashboard');
  }
);

// Start server
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
