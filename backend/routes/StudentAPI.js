//import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
var  {User} = require("../models/User.js");
const jwt=require('jsonwebtoken');

// define the Express app
const app = express();

//Register User
router.post('/', (req,res) => {
    const name=req.body.name;
    const email=req.body.email;
    const photo=req.body.photo;

    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'});
            const newUser = new User({
                name,
                email,
                photo
            });
            newUser
            .save()
            .then(user => {
                jwt.sign(
                    { 
                      id: user.id,
                      email: user.email,
                      name: user.name,
                    },
                    process.env.JWT_SECRET,
                    {expiresIn: 600},
                    (err,token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )                
            })
            .catch(err => res.status(400).json("Error: " + err));
        }) 
});

module.exports = router;
