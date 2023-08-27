const express = require("express");
const {editCommunity, getStatsCommunity, createCommunity, deleteCommunity, getAllCommunities, getCommunity, getUserCommunities, getUserSuggestions, unfollowCommunity, followCommunity, getUsers, getAllOfCommunities } = require("../Controllers/communitiesController");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "AllPictures" });
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.route("/stats")
    .get(async (req, res, next) => {
        const stats = await getStatsCommunity();
        return res.send(stats);
    });

router.route("/")
    .get(async (req, res, next) => {
        const comments = await getAllCommunities();
        return res.send(comments);
    });

router.route("/add")
    .post(upload.single('profile_img'), async (req, res, next) => {
        const community = await createCommunity(req.body, req.file);
        return res.send(community); 
    });

    router.route("/edit")
    .put(upload.single('profile_img'), async (req, res, next) => {
        const community = await editCommunity(req.body, req.file);
        return res.send(community); 
    });


router.route('/all').get(async (req, res, next) => {
    const communities = await getAllOfCommunities();
    return res.send(communities);
})


router.delete('/delete/:id', async (req, res, next) => {
    try {
        const user = await deleteCommunity(req.params.id);
        console.log(req.params.id);
        return res.json(user);
    } catch (error) {
        return next(error);
    }
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