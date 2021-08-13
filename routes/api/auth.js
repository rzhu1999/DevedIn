// handle getting JSON web token for authentication

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

// check express-validator @ github for more info
const { check, validationResult } = require('express-validator');

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

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public (because we want to get the token so we can make request to private routes)
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 400: bad request
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // See if user exists
            // findOne(field): search by field
            let user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Match the user and the password
            // compare(plain password, encrypted password)
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Return jsonwebtoken
            // Get the payload with userId
            const payload = {
                user: {
                    id: user.id,
                },
            };

            // Sign the token
            jwt.sign(
                payload, // Pass in the payload
                config.get('jwtSecret'),
                { expiresIn: 360000 }, // Pass in secret expiration
                (err, token) => {
                    if (err) throw err;
                    res.json({ token }); // sent the token back to the client if don't get an error
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
