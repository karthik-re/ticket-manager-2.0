const { getUser } = require("../services/users");

exports.authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        next();
    }
    const user = await getUser(token);
    req.user = user;
    next();
}

exports.ensureUser = (req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.status(401).send({message:"Unauthorized error"})
    }
}