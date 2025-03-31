const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// encrypting the data using jwt
app.get("/", (req, res) => {
    let token = jwt.sign({email: "satyam@124gmail.com"}, "secret");
    res.cookie("token", token);
    res.send("cookie set");
});

// decrypting the data using jwt
app.get("/read", (req, res) => {
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});