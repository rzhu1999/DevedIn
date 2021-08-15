const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // enable us to attach a profile image to our email
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// For the .populate() function to work, the ref parameter should be the same as the first argument when making the mongoose model.
module.exports = User = mongoose.model('user', UserSchema);
