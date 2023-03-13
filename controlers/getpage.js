// Require the necessary modules and models
const express = require('express');
const User = require('../models/User');
const Object = require('../models/Object')

// Route handler to render the home page
const gethome = (req, res) => {
    try {
        // Render the home page
        res.status(200).render('home');
    } catch (err) {
        // If there is an error, send a 404 error message
        res.status(404).send('Error 404: Page not found.');
    }
}

// Route handler to render the login page
const getlogin = (req, res) => {
    try {
        // Render the login page
        res.status(200).render('login');
    } catch (err) {
        // If there is an error, send a 404 error message
        res.status(404).send('Error 404: Page not found.');
    }
}

// Route handler to render the registration page
const getregister = (req, res) => {
    try {
        // Render the registration page
        res.status(200).render('register');
    } catch (err) {
        // If there is an error, send a 404 error message
        res.status(404).send('Error 404: Page not found.');
    }
}

// Route handler to render the home page after user logs in
const gethomein = (req, res) => {
    Object.find({}, (err, docs) => {
        try {
            // Render the homein page and pass the list of objects, title and image
            return res.status(200).render('homein', {
                objectList: docs,
                title: Object.title,
                image: Object.image
            });
        } catch (err) {
            // If there is an error, send a 404 error message
            return res.status(404).send('Error 404: Page not found');
        }
    });
}

// Route handler to render the user's profile page
const getprofile = (req, res) => {
    User.findOne({ email: req.cookies.email }, (err, docs) => {
        try {
            // Render the profile page and pass the user's information
            return res.status(200).render('profile', {
                profilePicture: docs.profilePicture,
                firstName: docs.firstName,
                lastName: docs.lastName,
                email: docs.email,
                phoneNumber: docs.phoneNumber

            });
        } catch (err) {
            // If there is an error, send a 404 error message
            res.status(404).send('Error 404: Page not found');
        }
    });
}

// Route handler to render the edit profile page
const geteditProfile = (req, res) => {
    User.findOne({ email: req.cookies.email }, (err, docs) => {
        try {
            // Render the edit profile page and pass the user's information
            return res.status(200).render('editProfile', {
                //profile picture
                firstName: docs.firstName,
                lastName: docs.lastName,
                phoneNumber: docs.phoneNumber,
                email: docs.email,
                password: docs.password
            });
        } catch (err) {
            // If there is an error, send a 404 error message
            res.status(404).send('Error 404: Page not found');
        }
    });
}

// Route handler to render the sell page
const getsellPage = (req, res) => {
    try {
        // Renders the sell page
        res.status(200).render('sellPage');
    } catch (err) {
        // If there is an error, send a 404 error message
        res.status(404).send('Error 404: Page not found.');
    }
}

// Route handler to render the index page
const getlogout = (req, res) => {
    try {
        // Sets the "token" cookie to null with a maxAge of 1 millisecond, then redirects the user to the home page
        return res.cookie("token", null, { maxAge: 1 }).status(200).redirect('/');
    } catch (err) {
        // Sends a 403 error if the action is forbidden
        return res.status(403).send('Error 403: Forbidden');
    }
}

// Exports the functions to be used by other files
module.exports = {
    gethome,
    getlogin,
    getregister,

    gethomein,

    getprofile,
    geteditProfile,
    getsellPage,

    getlogout,
}