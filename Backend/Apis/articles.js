const express = require("express");
const { edit,createArticleAdmin, deleteArticle, getAllArticles, getArticleWithContent, createArticle, updateLikes, getIfLikeArticle, updateDislikes, getIfDislikeArticle, getTopArticles, getUserArticles, getMyArticles, getCommunityArticles, getAllOfArticles, getNumArticlesPerCommunity } = require("../Controllers/articlesController");
const checkArticleExistance = require("../Middlewares/checkArticleExistance");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "AllPictures" });
const fs = require("fs");
const path = require("path");

router.route("/")
    .get(async (req, res, next) => {
        const articles = await getAllArticles();
        return res.send({ articles });
    })
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
                    const result = await createArticle(req.body, user);
                    if (result.affectedRows > 0) {
                        return res.status(200).send("ok");
                    } else {
                        return res.sendStatus(400);
                    }
                }
            }
        );
    });


router.route("/add")
    .post(upload.single('article_img'), async (req, res, next) => {
        const article = await createArticleAdmin(req.body, req.file);
        return res.send(article);
    });

router.route('/edit').put(upload.single('article_img'), async (req, res, next) => {
    const article = await edit(req.body, req.file);
    return res.send(article);
});

router.route('/all').get(async (req, res, next) => {
    const articles = await getAllOfArticles();
    return res.send(articles);
})


router.route('/stats').get(async (req, res, next) => {
    const articles = await getNumArticlesPerCommunity();
    return res.send(articles);
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const user = await deleteArticle(req.params.id);
        console.log(req.params.id);
        return res.json(user);
    } catch (error) {
        return next(error);
    }
});

router.route("/update_likes/:id")
    .post(async (req, res, next) => {
        const id = req.params.id;
        const params = req.body;
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await updateLikes(id, user, params);
                    if (result.affectedRows > 0) {
                        return res.status(200).send("ok");
                    } else {
                        return res.sendStatus(400);
                    }
                }
            }
        );
    });

router.route("/update_dislikes/:id")
    .post(async (req, res, next) => {
        const id = req.params.id;
        const params = req.body;
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await updateDislikes(id, user, params);
                    if (result.affectedRows > 0) {
                        return res.status(200).send("ok");
                    } else {
                        return res.sendStatus(400);
                    }
                }
            }
        );
    });

router.route("/likes/:id")
    .get(async (req, res, next) => {
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
                    const result = await getIfLikeArticle(id, user);
                    if (result == true || result == false) {
                        return res.status(200).send({ isLiked: result });
                    } else {
                        return res.sendStatus(400);
                    }
                }
            }
        );
    });

router.route("/dislikes/:id")
    .get(async (req, res, next) => {
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
                    const result = await getIfDislikeArticle(id, user);
                    if (result == true || result == false) {
                        return res.status(200).send({ isDisliked: result });
                    } else {
                        return res.sendStatus(400);
                    }
                }
            }
        );
    });

router.route("/top")
    .get(async (req, res, next) => {
        const result = await getTopArticles();
        return res.send(result);
    });

router.route("/-:max")
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
                    const max = parseInt(req.params.max);
                    const result = await getUserArticles(user, max);
                    return res.send(result);
                }
            }
        );
    });

router.route("/mine/-:max")
    .get(async (req, res, next) => {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    const max = parseInt(req.params.max);
                    const user = decoded.userId;
                    const result = await getMyArticles(user, max);
                    return res.send(result);
                }
            }
        );
    });

router.route("/:user/-:max")
    .get(async (req, res, next) => {
        const max = parseInt(req.params.max);
        const user = parseInt(req.params.user);
        const result = await getMyArticles(user, max);
        return res.send(result);
    });

router.route("/community/:id/-:max")
    .get(async (req, res, next) => {
        const max = parseInt(req.params.max);
        const id = parseInt(req.params.id);
        const result = await getCommunityArticles(id, max);
        return res.send(result);
    });

router.route("/:id")
    .get(checkArticleExistance, async (req, res, next) => {
        const id = req.params.id;
        const article = await getArticleWithContent(id);
        return res.send(article);
    });

module.exports = router;