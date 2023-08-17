const express = require("express");
const router = new express.Router();
const fs = require("fs");
const path = require("path")
const logger = require("../Middlewares/winstonLogger");

router.route("/:pic")
    .get((req, res, next) => {
        const imageName = req.params.pic;
        const imagePath = path.join(__dirname, "..", "AllPictures", imageName);
        const imageStream = fs.createReadStream(imagePath);
        imageStream.on('open', () => {
            res.setHeader('Content-Type', 'image/jpeg');
            imageStream.pipe(res);
        });

        imageStream.on('error', (err) => {
            logger.error(new Error("cannot read an image"));
            res.status(500).send('Internal Server Error');
        });
    });

module.exports = router;