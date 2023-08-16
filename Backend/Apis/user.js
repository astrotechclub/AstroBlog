const express = require("express");
const router = express.Router();
const { getUserProfile, updateUser, updateUserPicture } = require("../Controllers/usersControllers");
const validateInputs = require("../Middlewares/validateInputs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "AllPictures" });
const fs = require("fs");
const path = require("path");

router.route("/mine")
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
                    const result = await getUserProfile(user);
                    if (result.length !== 1) {
                        return res.sendStatus(404);
                    } else {
                        return res.status(200).json(result[0]);
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
                    return res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await updateUser(user, req.body);
                    return res.status(200).send("ok");
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
                    return res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await updateUserPicture(user, req.file.filename);
                    if (result != "d8d3404fc80f99d5f4bf943d054dd772") {
                        const imgPath = path.join(__dirname, "..", "AllPictures", result);
                        try {
                            fs.unlink(imgPath, function (err) {
                                if (err) throw err;
                                console.log('File deleted!');
                            });
                            return res.status(200).send('ok');
                        } catch (err) {
                            console.error('Error deleting file:', err);
                            return res.status(500).send('Internal Server Error');
                        }
                    }
                }
            }
        );
    });

router.route("/:id")
    .get(async (req, res, next) => {
        const id = req.params.id;
        const result = await getUserProfile(id);
        if (result.length !== 1) {
            return res.sendStatus(404);
        } else {
            return res.status(200).json(result[0]);
        }
    });

module.exports = router;