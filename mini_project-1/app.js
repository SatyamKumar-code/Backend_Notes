const express = require('express');
const app = express();

const userModel = require('./model/userModel');
const postModel = require('./model/postModel');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const jwt = require('jsonwebtoken');

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/profile", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("post");
    if(!user) {
        return res.status(500).send("user not found");
    }
    res.render("profile", { user });
});

app.post("/post", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body;

    let post = await postModel.create({
        user: user._id,
        content
    });
    user.post.push(post._id);
    await user.save();
    res.redirect("/profile");
})

app.post("/register", async (req, res) => {
    let { username, name, age, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if(user) {
        return res.status(500).send("user already exists");
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash
            });

            let token = jwt.sign({email: email, userid: user._id}, "secret");
            res.cookie("token", token);
            res.send(user);
        } )
    })
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if(!email || !password) {
        return res.redirect("/login");
    }
    if(!user) {
        return res.status(500).json({ message: "user not found" }).send("something went wrong");
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = jwt.sign({email: email, user: user._id}, "secret");
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        } else {
            res.redirect("/login");
        }
    })
})


app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
})

function isLoggedIn(req, res, next) {
    if(!req.cookies.token) {
        return res.redirect("login");
    }
    try {
        let data = jwt.verify(req.cookies.token, "secret");
        req.user = data;
        next();
    } catch(error) {
        return res.send("Invalid token, please login again");
    }
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

