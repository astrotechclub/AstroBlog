const express = require("express");
const { getAllCommunities, getCommunity, getUserCommunities, getUserSuggestions, unfollowCommunity, followCommunity, getUsers } = require("../Controllers/communitiesController");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.route("/")
    .get(async (req, res, next) => {
        const comments = await getAllCommunities();
        res.send(comments);
        next();
    });

router.route("/unfollow")
    .post(async (req, res, next) => {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const community = req.body.community;
                    const result = await unfollowCommunity(community, user);
                    if (result.affectedRows > 0) {
                        res.status(200);
                        next();
                    } else {
                        res.sendStatus(400);
                    }
                }
            }
        );

    });

router.route("/follow")
    .post(async (req, res, next) => {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const community = req.body.community;
                    const result = await followCommunity(community, user);
                    if (result.affectedRows > 0) {
                        res.status(200);
                        next();
                    } else {
                        res.sendStatus(400);
                    }
                }
            }
        );

    });

router.route("/user/:id")
    .get(async (req, res, next) => {
        const id = req.params.id;
        const result = await getUserCommunities(id);
        res.send(result);
        next();
    });

router.route("/suggestions/:id")
    .get(async (req, res, next) => {
        const id = req.params.id;
        const result = await getUserSuggestions(id);
        res.send(result);
        next();
    })
router.route("/users/:id")
    .get(async (req, res, next) => {
        const id = req.params.id;
        const result = await getUsers(id);
        res.send(result);
        next();
    })

router.route("/:id")
    .get(async (req, res, next) => {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const id = req.params.id;
                    const results = await getCommunity(id, user);
                    res.send(results[0]);
                    next();
                }
            }
        );
    });


module.exports = router;