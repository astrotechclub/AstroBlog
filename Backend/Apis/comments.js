const express = require("express");
const { getAllComments, getArticleComments, AddComment, getMaxComments } = require("../Controllers/commentsController");
const checkArticleExistance = require("../Middlewares/checkArticleExistance");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.route("/")
    .get(async (req, res, next) => {
        const comments = await getAllComments();
        return res.send(comments);
    });

router.route("/:id-:max")
    .get(checkArticleExistance, async (req, res, next) => {
        const max = parseInt(req.params.max);
        const id = req.params.id;
        const result = await getMaxComments(id, max);
        return res.send(result);
    });

router.route("/:id")
    .get(checkArticleExistance, async (req, res, next) => {
        const id = req.params.id;
        const comments = await getArticleComments(id);
        return res.send(comments);
    })
    .post(async (req, res, next) => {
        const id = req.params.id;
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await AddComment(user, req.body, id);
                    if (result.affectedRows > 0) {
                        return res.status(200);
                    } else {
                        return res.sendStatus(401);
                    }
                }
            }
        );

    });


module.exports = router;