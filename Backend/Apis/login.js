const express = require("express");
const checkCredentials = require("../Middlewares/checkCredentials");
const { getUserId, setRefreshToken } = require("../Controllers/usersControllers");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.route("/")
    .post(checkCredentials, async (req, res, next) => {
        //add entry in the log file
        const tmp = await getUserId(req.body.email);
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
        return res.status(200).send({ userId: userId });
    });


module.exports = router;