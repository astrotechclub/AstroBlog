const express = require("express");
const { getAllArticles, getArticleWithContent, createArticle, updateLikes, getIfLikeArticle, updateDislikes, getIfDislikeArticle, getTopArticles, getUserArticles, getMyArticles, getCommunityArticles } = require("../Controllers/articlesController");
const checkArticleExistance = require("../Middlewares/checkArticleExistance");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.route("/")
    .get(async (req, res, next) => {
        const articles = await getAllArticles();
        res.send({ articles: articles, userId: req.userId });
        next();
    })
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
                    const result = await createArticle(req.body, user);
                    if (result.affectedRows > 0) {
                        res.status(201);
                        next();
                    } else {
                        res.sendStatus(400);
                    }
                }
            }
        );
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
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await updateLikes(id, user, params);
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
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await updateDislikes(id, user, params);
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

router.route("/likes/:id")
    .get(async (req, res, next) => {
        const id = req.params.id;
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await getIfLikeArticle(id, user);
                    if (result == true || result == false) {
                        res.status(200).send({ isLiked: result });
                        next();
                    } else {
                        res.sendStatus(400);
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
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    const result = await getIfDislikeArticle(id, user);
                    if (result == true || result == false) {
                        res.status(200).send({ isDisliked: result });
                        next();
                    } else {
                        res.sendStatus(400);
                    }
                }
            }
        );
    });

router.route("/top")
    .get(async (req, res, next) => {
        const result = await getTopArticles();
        res.send(result);
        next();
    });

router.route("/-:max")
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
                    const max = parseInt(req.params.max);
                    const result = await getUserArticles(user, max);
                    res.send({ articles: result, userId: req.userId });
                    next();
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
                    res.sendStatus(403);
                } else {
                    const max = parseInt(req.params.max);
                    const user = decoded.userId;
                    const result = await getMyArticles(user, max);
                    res.send({ articles: result, userId: req.userId });
                    next();
                }
            }
        );
    });

router.route("/:user/-:max")
    .get(async (req, res, next) => {
        const max = parseInt(req.params.max);
        const user = parseInt(req.params.user);
        const result = await getMyArticles(user, max);
        res.send({ articles: result, userId: req.userId });
        next();
    });

router.route("/community/:id/-:max")
    .get(async (req, res, next) => {
        const max = parseInt(req.params.max);
        const id = parseInt(req.params.id);
        const result = await getCommunityArticles(id, max);
        res.send({ articles: result, userId: req.userId });
        next();
    });

router.route("/:id")
    .get(checkArticleExistance, async (req, res, next) => {
        const id = req.params.id;
        const article = await getArticleWithContent(id);
        res.send(article);
        next();
    });

module.exports = router;