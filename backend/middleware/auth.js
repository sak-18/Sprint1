//import dependencies
require("dotenv").config();
const jwt = require('jsonwebtoken');


function auth(req,res,next){
    const token=req.header('x-auth-token');
    try{
        //check for token
        if(!token){
            res.status(401).json({ msg: 'you dont have access, authorisation denied'});
        }
    
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
    
        //add user from payload
    
        req.user = decoded;
        next();

    }catch(e){
        res.status(400).json({ msg: 'Invalid Token '});
    }
}
module.exports =auth;