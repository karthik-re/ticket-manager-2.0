const userServices = require("../services/users");

exports.authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        next();
    }
    try {
        const user = await userServices.getUser(token);
        req.user = user;
        next();
    } catch (err) {
        //res.status(400).send({ message: err.message })
        next(err);
    }
}

exports.ensureUser = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.status(401).send({ message: "Unauthorized error" })
    }
}