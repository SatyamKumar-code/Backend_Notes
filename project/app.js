const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

ap.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000);