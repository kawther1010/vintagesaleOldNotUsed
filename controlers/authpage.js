// Import required packages and modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Import User model and validation functions
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');


// Controller function for user login
const postlogin = async (req, res) => {

    // Validate user input using the login validation schema
    const { error } = loginValidation(req.body);

    // Check if the request body is valid according to the Joi schema defined in the validation.js file
    if (error) return res.status(400).send('Invalid request body: ' + error.details[0].message);

    // Check if a user with the given email exists in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send('Authentication failed: email or password is incorrect');

    // Compare the given password with the stored password hash for the user
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send('Authentication failed: email or password is incorrect');

    // Generate a JWT token with the user's email as the payload
    const token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET);
    console.log("token: " + token);

    // Set the token as an HTTP-only cookie and redirect to the homepage
    try {
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        }).status(200).redirect('homepage');
    } catch (err) {
        res.status(404).send('Error 404: Page not found.');
    }

}



// Controller function for user registration
const postregister = async (req, res) => {

    // Validate user input using the register validation schema
    const { error } = registerValidation(req.body);

    // Check if the request body is valid according to the Joi schema defined in the validation.js file
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join('; ');
        return res.status(400).send(`Invalid request body: ${errorMessage}`);
    }

    // Check if a user with the given email already exists in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('User with this email already exists');

    // Check if the given password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send('The password and confirm password do not match');
    }

    // Hash the password using bcrypt and generate a new User object to save in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User object with provided information
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword,
    });

    // Generate a JWT token with the user's name and email as the payload
    const token = jwt.sign({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }, process.env.TOKEN_SECRET);
    console.log("token: " + token);

    // Save the user object to the database and set the token as an HTTP-only cookie before redirecting to the homepage
    try {
        await user.save();
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        }).status(201).redirect('homepage');

    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    postlogin,
    postregister,
}
