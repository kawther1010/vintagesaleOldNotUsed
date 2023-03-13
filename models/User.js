const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    lastName: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Please enter 10 digits only.`
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
