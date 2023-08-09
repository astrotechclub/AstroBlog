const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyJWT = async (req, res, next) => {
    const token = await req.cookies.token;
    if (!token) {
        return res.sendStatus(401);
    } else {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    next();
                }
            }
        );
    }
}


module.exports = verifyJWT;