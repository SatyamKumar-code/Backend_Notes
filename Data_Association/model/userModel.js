const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/association");

const userSchema = new mongoose.Schema({
    username: {
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
    age: {
        type: Number,
        min: 18,
        max: 65
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

module.exports = mongoose.model("User", userSchema);