// handle user registration, adding users, etc

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// check express-validator @ github for more info
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 400: bad request
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // See if user exists
            // findOne(field): search by field
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }

            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200', // default size
                r: 'pg', // no sensitive image
                d: 'mm', // default image: user icon
            });

            // Create an instance of user (not saved yet)
            user = new User({
                name,
                email,
                avatar,
                password,
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10); // Create a salt to do the hashing with.

            user.password = await bcrypt.hash(password, salt);

            await user.save();

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
