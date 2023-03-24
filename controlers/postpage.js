const express = require('express');
const { updateOne } = require('../models/User');
const User = require('../models/User');
const Object = require('../models/Object');

// Required libraries
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Validation functions
const { registerValidation, loginValidation } = require('../validation');

// Function to handle POST requests to create a new Object
const postObject = (req, res) => {

    // Find user by email from the cookies
    const userEmail = User.findOne({ email: req.cookies.email }, async (err, docs) => {

        try {
            // Create a new Object with the given properties
            let newObject = await new Object({
                //seller: userEmail._id,
                seller:req.cookies.email,
                title: req.body.title,
                description: req.body.description,
                //image: req.body.image,
                startingPrice: req.body.startingPrice,
                endDate: req.body.endDate,
                sold: req.body.sold,
            });
            // Save the new Object to the database
            await newObject.save();
            return res.status(200).send("Saved successfully.");
        } catch (err) {
            // Handle errors if any
            console.log(err);
            res.status(404).send("Error 404: Page not found");
        }
    });
}

// Function to handle POST requests to edit user profile
const postEditProfile = (req, res) => {

    // Find user by email from the cookies
    User.findOne({ email: req.cookies.email }, async (err, docs) => {

        try {
            // Validate user input
            const { error } = registerValidation(req.body);

            // Check if the phone number is long enough
            if (req.body.phoneNumber.length < 10) return res.status(400).send('This phone number is too short')

            // Hash the user's new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Define variables for each field to update
            const firstName = { firstName: docs.firstName };
            const lastName = { lastName: docs.lastName };
            const email = { email: docs.email };
            const phoneNumber = { phoneNumber: docs.phoneNumber };
            const password = { password: docs.password };

            // Update each field individually in the database
            await User.updateOne(firstName, { firstName: req.body.firstName });
            await User.updateOne(lastName, { lastName: req.body.lastName });
            await User.updateOne(email, { email: req.body.email });
            await User.updateOne(phoneNumber, { phoneNumber: req.body.phoneNumber });
            await User.updateOne(password, { password: hashedPassword });

            // Redirect the user to their profile page after successful update
            return res.status(200).redirect('/homepage/profile');
        } catch (err) {
            // Handle errors if any
            console.log(err);
            return res.status(404).send("Page 404: page not found.");
        }
    });
}

// Export the functions for use in other modules
module.exports = {
    postObject,
    postEditProfile
}
