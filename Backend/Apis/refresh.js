const express = require("express");
const router = express.Router();
const { refreshTokenExists } = require("../Controllers/usersControllers");
const jwt = require("jsonwebtoken");

router.route("/")
    .get(async (req, res, next) => {
        const refreshToken = req.cookies.jwt;
        const refreshExists = await refreshTokenExists(refreshToken);
        if (!refreshExists) {
            return res.sendStatus(403);
        } else {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        return res.sendStatus(401);
                    } else {
                        req.userId = decoded.userId;
                        const accessToken = jwt.sign(
                            { "userId": decoded.userId },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
                        );
                        res.cookie('token', accessToken, { httpOnly: true, maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME_IN_MS) });
                        return res.status(200);
                    }
                }
            );
        }
    })


module.exports = router;

