const { isMyEmail, getPasswordById } = require("../Controllers/usersControllers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const checkPasswordValidation = async (id, password) => {
    const result = await getPasswordById(id);
    console.log(result);
    bcrypt.compare(password, result.user_password, (err, r) => {
        if (r) {
            return true;
        } else {
            return false
        }
    })
}

const validateInputs = async (req, res, next) => {
    let errors = undefined;
    if (!req.body.fullname || req.body.fullname.length < 8 || !isNaN(req.body.fullname)) {
        errors = { ...errors, fullname: "this is not a valid fullname!" };
    }
    if (req.body.new_psw) {
        const token = req.cookies.token;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    const user = decoded.userId;
                    if (!req.body.old_psw || await checkPasswordValidation(user, req.body.old_psw)) {
                        errors = { ...errors, old_psw: "Wrong password!" };
                    }
                    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
                    const password = req.body.new_psw;
                    if (!regex.test(password)) {
                        errors = { ...errors, new_psw: "Password must contain at least 8 caracters, 2 digits and 2 special caracters!" };
                    }
                    if (password != req.body.new_psw_conf) {
                        errors = { new_psw_conf: "Password doesn't match!" };
                    }
                }
            }
        );
    }
    if (errors) {
        res.status(422).send(errors);
    }
    else {
        next();
    }
}

module.exports = validateInputs;