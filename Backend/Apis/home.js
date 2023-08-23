const express = require("express");
const searchEngineController= require("../Controllers/searchEngineController");
const router = express.Router();



router.route("/").get(async (req, res) => {
    const search = req.query
    if (search) {
        const param = search.search
        const results = {}
        results.article = await searchEngineController.getArticleSearch(param)
        results.user = await searchEngineController.getUserSearch(param)
        if (results) {
            res.status(200).json(results)
        }
        else {
            res.status(400).json({})
        }
    }
})

module.exports = router;