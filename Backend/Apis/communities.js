const express = require("express");
const { getAllCommunities, getCommunity, getUserCommunities, getUserSuggestions, unfollowCommunity, followCommunity, getUsers } = require("../Controllers/communitiesController");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.route("/")
    .get(async (req, res, next) => {
        const comments = await getAllCommunities();
        return res.send(comments);
    });

router.route("/unfollow")
    .post(async (req, res, next) => {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const community = req.body.community;
                    const result = await unfollowCommunity(community, user);
                    if (result.affectedRows > 0) {
                        return res.status(200);
                    } else {
                        return res.sendStatus(400);
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
                    return res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const community = req.body.community;
                    const result = await followCommunity(community, user);
                    if (result.affectedRows > 0) {
                        return res.status(200);
                    } else {
                        return res.sendStatus(400);
                    }
                }
            }
        );

    });

router.route("/following/mine")
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
                    const result = await getUserCommunities(user);
                    return res.send(result);
                }
            }
        );
    });

router.route("/suggestions/mine")
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
                    const result = await getUserSuggestions(user);
                    return res.send(result);
                }
            }
        );
    })
router.route("/users/:id")
    .get(async (req, res, next) => {
        const id = req.params.id;
        const result = await getUsers(id);
        return res.send(result);
    })

router.route("/:id")
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
                    const id = req.params.id;
                    const results = await getCommunity(id, user);
                    return res.send(results[0]);
                }
            }
        );
    });


module.exports = router;