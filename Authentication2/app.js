const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const userModel = require("./models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("index")
})
app.post("/create", (req, res) => {
    let {usernaem, email, password, age} = req.body;

    // bcrypt is a hashing algorithm used to hash passwords
    // It is used to hash the password before storing it in the database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                usernaem,
                email,
                password: hash,
                age
            })
            let token = jwt.sign({email}, "secret");
            res.cookie("token", token);
            res.send(createdUser);
        })
    })
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/login", async (req, res) => {
    let user = await userModel.findOne({email: req.body.email});
    if (!user) return res.status(400).send("something went wrong");

    bcrypt.compare(req.body.password, user.password, (err, result) => {
       if (result){ 
        let token = jwt.sign({email: user.email}, "secret");
            res.cookie("token", token);
        return res.status(200).send("yes you can login")}
        else return res.status(401).send("no you can't login"); 
    })
})
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});