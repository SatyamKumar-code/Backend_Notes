const mongoose = require('mongoose');



const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
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

module.exports = mongoose.model("owner", ownerSchema);