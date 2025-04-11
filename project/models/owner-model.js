const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/E-comerce");

const ownerSchema = new mongoose.Schema({
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
    products: {
        type: Array,
        default: []
    },
    picture: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Default-Profile-Picture-Transparent.png"
    },
    gstin: {
        type: String
    }
})

module.exports = mongoose.model("user", ownerSchema);