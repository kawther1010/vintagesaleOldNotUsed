const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

// Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Render the profile page with the user's information
router.get('/', (req, res) => {
    res.render('profile', {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        profilePicture: req.user.profilePicture
    });
});

// Handle file upload for user's profile picture
router.post('/upload', upload.single('profilePicture'), (req, res) => {
    // Get the path to the uploaded file
    const filePath = req.file.path.substring(6); // remove 'public' from the path

    // Save the path to the user's profile in the database
    User.findByIdAndUpdate(req.user._id, { profilePicture: filePath }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Profile picture uploaded successfully.');
        }
    });

    // Redirect back to the profile page
    res.redirect('/profile');
});

module.exports = router;
