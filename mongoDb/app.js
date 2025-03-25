const express = require('express');
const app = express();
const path = require('path')
const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", ( req, res ) => {
    res.render("index");
})
app.get("/read",async ( req, res ) => {
    let allusers = await userModel.find();
    res.render("read", { users: allusers});
})
app.get("/delete/:id", async ( req, res ) => {
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read")
})
app.post("/create",async ( req, res ) => {
    let { name, email, image } = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect("/read")
})

app.listen(3000);