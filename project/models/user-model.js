const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/E-comerce");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    cart: {
        type: Array,
        default: []
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    picture: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Default-Profile-Picture-Transparent.png"
    }
})

module.exports = mongoose.model("user", userSchema);