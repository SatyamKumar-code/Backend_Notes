const mongoose = require('mongoose')

const dbConnect = mongoose.connect("mongodb://127.0.0.1:27017/testapp1");

const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String
})

module.exports = mongoose.model('user', userSchema);
