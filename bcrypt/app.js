const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.get("/", (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("password", salt, (err, hash) => {
            if (err) throw err;
            console.log(hash);
            res.send(hash);
        })
    })
})

app.get("/compare", (req, res) => {
    bcrypt.compare("password", "$2b$10$f6b60GtffFT3dhXObbb2ru6I6IvVM.93jO0yYM1hMzbQlv7ZMIiHm", (err, result) => {
        console.log(result);
    });
})

app.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server is running on port 3000");
} );