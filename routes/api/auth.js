// handle getting JSON web token for authentication

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        // In middleware we set req.user to the user in the token, we can simply pass in req.user
        // We can access it from anywhere in a protected route
        const user = await User.findById(req.user.id).select('-password'); // Don't return the password
        res.json(user);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
