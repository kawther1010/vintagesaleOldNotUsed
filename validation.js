// Import required packages and modules
const express = require('express');
const Joi = require('@hapi/joi');

// Function to validate user registration data
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(), // First name should be at least 3 characters long and is required
        lastName: Joi.string().min(3).required(), // Last name should be at least 3 characters long and is required
        email: Joi.string().email().required(), // Email should be a valid email address and is required
        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(), // Phone number should be at least 10 digits long and is required
        password: Joi.string().min(6).required(), // Password should be at least 6 characters long and is required
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(), // Confirm password should match the password field and is required
    });
    return schema.validate(data); // Validate user data against schema and return validation result
};

// Function to validate user login data
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(), // Email should be a valid email address and is required
        password: Joi.string().min(6).required(), // Password should be at least 6 characters long and is required
    });
    return schema.validate(data); // Validate user data against schema and return validation result
};

// Export the validation functions to use them in other files
module.exports = {
    registerValidation,
    loginValidation,
}