const mongoose = require('mongoose');
const config = require('config');
const dbgr = require("debug")("development:mongoose");

mongoose.connect(`${config.get("MONGO_URI")}/E-commerce`)
.then(function () {
    dbgr("Connected");
}
).catch(function (err) { 
    dbgr("Error", err);
}
);

module.exports = mongoose.connection;

