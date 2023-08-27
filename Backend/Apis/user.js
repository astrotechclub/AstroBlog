const express = require("express");
const router = express.Router();
const {editUserWithPicture,editUser, addNewUserAdmin, getUserProfile, updateUser, updateUserPicture, getUserProfileByName, getAllUsers, deleteUser, getStatsUsersAdmin, getStatsUsersCategory } = require("../Controllers/usersControllers");
const validateInputs = require("../Middlewares/validateInputs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "AllPictures" });
const fs = require("fs");
const path = require("path");
const logger = require("../Middlewares/winstonLogger");

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

router.route("/all").get(async (req, res, next) => {
    const users = await getAllUsers();
    return res.send(users);
})

router.route("/stats/admin").get(async (req, res, next) => {
    const users = await getStatsUsersAdmin();
    return res.send(users);
})

router.route("/stats/category").get(async (req, res, next) => {
    const users = await getStatsUsersCategory();
    return res.send(users);
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id);
        console.log(req.params.id);
        return res.json(user);
    } catch (error) {
        return next(error);
    }
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
                            logger.error("error while deleting file");
                            return res.status(500).send('Internal Server Error');
                        }
                    }
                }
            }
        );
    });

router.route('/add').post(upload.single('profile_pic'), async (req, res, next) => {
    const user = await addNewUserAdmin(req.body, req.file);
    console.log(user);
    return res.send(user);
});

router.route('/editUser').put(upload.single('profile_pic'), async (req, res, next) => {
    const user = await editUserWithPicture(req.body, req.file);
    console.log(user);
    return res.send(user);
});

// router.route('/editUser').put(async (req, res, next) => {
//     const user = await editUser(req.body);
//     return res.send(user);
// });

router.route("/:id")
    .get(async (req, res, next) => {
        const name = req.params.id;
        const result = await getUserProfileByName(name);
        if (result.length !== 1) {
            return res.sendStatus(404);
        } else {
            return res.status(200).json(result[0]);
        }
    });

module.exports = router;