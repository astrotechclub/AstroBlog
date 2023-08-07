const express = require("express");
const router = express.Router();
const { getUserProfile, updateUser, updateUserPicture } = require("../Controllers/usersControllers");
const validateInputs = require("../Middlewares/validateInputs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "ProfilePictures/" });
const fs = require("fs");

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
                    const user = decoded.userId;
                    const result = await getUserProfile(user);
                    if (result.length !== 1) {
                        res.sendStatus(404);
                    } else {
                        res.status(200).json(result[0]);
                        next();
                    }
                }
            }
        );
    });

router.route("/update")
    .post(validateInputs, async (req, res, next) => {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await updateUser(user, req.body);
                    res.status(200);
                    next();
                }
            }
        );
    });

router.route("/updatePicture")
    .post(upload.single('image'), async (req, res, next) => {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await updateUserPicture(user, req.file.filename);
                    const path = `AllPictures/${result}`;
                    fs.unlinkSync(path);
                    res.status(200);
                    next();
                }
            }
        );
    });

router.route("/:id")
    .get(async (req, res, next) => {
        const id = req.params.id;
        const result = await getUserProfile(id);
        if (result.length !== 1) {
            res.sendStatus(404);
        } else {
            res.status(200).json(result[0]);
            next();
        }
    });

module.exports = router;