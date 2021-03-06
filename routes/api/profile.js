// contains routes that related to fetch, add, update profiles

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator'); // It's a post request that takes data

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        // Pertain to Profile model user filed -> ObjectId of the user
        // populate(A,B): populate with B from collection A
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        );

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create/update user profile
// @access  Private

// Use both auth middleware and the validation middleware
router.post(
    '/',
    [
        auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Poll info out from request body
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
            wechat,
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills
                .split(',') // Turn the String into Array
                .map((skill) => skill.trim()); // Remove extra space: Map through the Array
        }
        // console.log(profileFields.skills);

        // Build social object
        profileFields.social = {}; // Set .social an object first otw social.xxx will be undefined
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;
        if (wechat) profileFields.social.wechat = wechat;

        // Update & Insert the data
        try {
            let profile = await Profile.findOne({ user: req.user.id }); // Find by the user

            if (profile) {
                // Update with profile variable
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Otw, create with same profile variable
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'name',
            'avatar',
        ]);
        res.json(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile
// @desc    Delete profile, user, and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - Remove user posts
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'Start date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, company, location, from, to, current, description } =
            req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);
            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/profile/experience
// @desc    Delete profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        // Get profile
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.experience
            .map((item) => item.id) // Loop through the experiences collection
            .indexOf(req.params.exp_id); // Match the :exp_id with the experience

        // arrayObject.splice(index, howmany, item1,.....,itemX)
        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('from', 'Start date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { school, degree, fieldofstudy, from, to, current, gpa } =
            req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            gpa,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/profile/education
// @desc    Delete profile education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        // Get profile
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.education
            .map((item) => item.id) // Loop through the experiences collection
            .indexOf(req.params.edu_id); // Match the :exp_id with the experience

        // arrayObject.splice(index, howmany, item1,.....,itemX)
        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: encodeURI(
                `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
            ),
            method: 'GET',
            headers: {
                'user-agent': 'node.js',
                Authorization: `token ${config.get('githubToken')}`,
            },
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No github profile found' });
            }

            res.json(JSON.parse(body)); // Format the body
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
