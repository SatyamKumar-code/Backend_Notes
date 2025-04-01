const express = require('express');
const app = express();
const userModel = require("./model/userModel");
const postModel = require("./model/postModel");


app.get("/", (req, res) => {
    res.send("hello world");
})
app.get("/create",async (req, res) => {
    let user =await userModel.create({
        username: "Satyam",
        email: "Satyam@gmail.com",
        password: "1234",
        age: 23
    })
    res.send(user);
})

app.get("/create/post", async (req, res) => {
    let post = await postModel.create({
        postdata: "this is my first post",
        user:"67ec0a8376aaa51f8c7649cd"
    })
   let user = await userModel.findOne({_id: "67ec0a8376aaa51f8c7649cd"});
   user .post.push(post._id);
    await user.save();
    res.send({post, user});
})
app.listen(3000, () => {
    console.log("server is running on port 3000");
})