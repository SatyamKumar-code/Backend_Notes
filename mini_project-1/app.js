const express = require('express');
const app = express();

const userModel = require('./model/userModel');
const postModel = require('./model/postModel');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const upload = multer({ storage: storage })

app.get("/signup", (req, res) => {
    res.render("index");
})


app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("post");
    if(!user) {
        return res.status(500).send("user not found");
    }
    res.render("profile", { user });
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    if(post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }

    await post.save();
    res.redirect("/");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    res.render("edit", { post });
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });
    res.redirect("/");
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
    res.redirect("/");
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
            res.status(200).redirect("/");
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

