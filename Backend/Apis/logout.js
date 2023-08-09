const express = require("express");
const router = express.Router();
const { updateRefreshToken } = require("../Controllers/usersControllers");
const jwt = require("jsonwebtoken");

router.route("/")
    .get(async (req, res, next) => {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await updateRefreshToken(user);
                    if (result.affectedRows == 1) {
                        res.clearCookie("jwt");
                        res.clearCookie("token");
                        return res.sendStatus(200);
                    } else {
                        return res.status(401);
                    }
                }
            }
        );

    });


module.exports = router;