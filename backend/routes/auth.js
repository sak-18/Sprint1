//import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
var  {User} = require("../models/User.js");
const jwt=require('jsonwebtoken');

const auth = require('../middleware/auth');

// define the Express app
const app = express();

//Find token for user
router.post('/', (req,res) => {
    const email=req.body.email;

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exist'});
            jwt.sign(
              { 
                id: user.id,
                email: user.email,
                name: user.name,
                photo: user.photo,
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
});

router.get('/user', (req,res)  => {
  User.findById(req.user.id)
    .then(user => res.json(user))
    .catch(error => { res.sendStatus(400).json({msg:'Hey something went wrong'})});
});

module.exports = router;
