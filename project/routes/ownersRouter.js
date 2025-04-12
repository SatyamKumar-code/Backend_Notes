const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-Model");

if(process.env.NODE_ENV === "development"){
    router.post("/create",async (req, res) => {
        let owner = await ownerModel.find();
        if(owner.length > 0) {
            return res
                .status(503)
                .json("You dont't have permission to create a new owner");
        };
        let { fullname, email, password } = req.body;
        if(!fullname || !email || !password) {
            return res.status(400).json("Please provide all fields");
        };
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        });

        res.status(201).send(createdOwner);
    });
}

router.get("/", (req, res) => {
    res.send("hey");
})



module.exports = router;