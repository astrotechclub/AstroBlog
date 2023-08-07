const express = require("express");
const router = express.Router();
const { checkNewUser } = require("../Middlewares/checkNewUser");
const { addNewUser, getUserId, setRefreshToken } = require("../Controllers/usersControllers");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.route("/")
    .post(async (req, res, next) => {
        const user = req.body;
        const result = await addNewUser(user);
        if (result.affectedRows > 0) {
            // add entry in log file
            const tmp = await getUserId(user.email);
            const userId = tmp.id;
            const accessToken = jwt.sign(
                { "userId": userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
            );
            const refreshToken = jwt.sign(
                { "userId": userId },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
            );
            await setRefreshToken(userId, refreshToken);
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME_IN_MS) });
            res.cookie('token', accessToken, { httpOnly: true, maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME_IN_MS) });
            res.status(200).send({ userId: userId });
            next();
        } else {
            // add entry in errors log file
            res.sendStatus(401);
        }
    });

router.route("/validate")
    .post(checkNewUser, (req, res, next) => {
        res.status(200).send({ ok: true });
        next();
    })
module.exports = router;