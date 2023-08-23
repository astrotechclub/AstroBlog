const bcrypt = require("bcrypt");
const { emailExists, getPassword } = require("../Controllers/usersControllers");


const checkCredentials = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        console.log(req.body)
        res.status(403).send("Password or email is empty!");
    } else {
        const email = req.body.email;
        const password = req.body.password;
        if (await emailExists(email)) {
            const result = await getPassword(email);
            bcrypt.compare(password, result.password, (err, r) => {
                if (r) {
                    res.status(200);
                    next();
                } else {
                    res.status(403).send("Password or email is wrong!");
                }
            })
        } else {
            res.status(403).send("Password or email is wrong!");
        }
    }
}


module.exports = checkCredentials;