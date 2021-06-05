var mongoose = require("mongoose");
const crypto = require("crypto");
const { trim } = require("lodash");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 40,
        trim: true
    },

    fullname: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    contact: {
        countrycode: {
            type: String,
            trim: true
        },
        number: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true,
            unique: true
        }
    },

    encrypted_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'operator'
    }
},
    { timestamps: true }
);



module.exports = mongoose.model("User", userSchema)