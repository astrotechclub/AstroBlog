const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getNotifications, seeNotification } = require("../Controllers/notificationsController");


router.route("/mine")
    .get(async (req, res, next) => {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const id = decoded.userId;
                    const result = await getNotifications(id);
                    res.send(result);
                    next();
                }
            }
        );
    });

router.route("/see")
    .post(async (req, res, next) => {
        const notif = req.body.notification;
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const id = decoded.userId;
                    const result = await seeNotification(id, notif);
                    res.send(200);
                    next();
                }
            }
        );
    });


module.exports = router;