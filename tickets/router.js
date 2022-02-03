const express = require('express');
const router = express.Router();
const {authMiddleware, ensureUser}= require("../uitls/auth")

router.get("/",ensureUser,async(req,res,next)=>{
    const name = req.user.name;
    res.status(200).send({message:`Hello! ${name}`});
})

module.exports = router;