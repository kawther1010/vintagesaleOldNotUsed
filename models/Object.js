const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectSchema = new Schema({
    // The `User` who is selling the object (referenced by their ObjectId).
    seller: {
        //type: Schema.Types.ObjectId,
        type: String,
        ref: 'User',
        required: true,
    },
    // The title of the object.
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
    },
    category:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    // The description of the object.
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000,
    },
    // The URL or path to the image of the object.
    /*
    image: {
        type: String,
        required: true
    },
    */
    // The starting price of the object.
    startingPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    // The current price of the object (updated dynamically during auctions).
    currentPrice: {
        type: Number,
        default: null,
        min: 0,
    },
    // The end date and time of the auction.
    endDate: {
        type: Date,
        required: true,
    },
    // The `User` who is currently the highest bidder (referenced by their ObjectId).
    buyer: {
        //type: Schema.Types.ObjectId,
        type: String,
        ref: 'User',
        default: null,
    },
    // A boolean indicating whether the object has been sold or not.
    sold: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Object', objectSchema);
