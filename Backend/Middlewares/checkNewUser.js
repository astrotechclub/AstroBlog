const { emailExists } = require("../Controllers/usersControllers");

const checkNewUser = async (req, res, next) => {
    let errors = {};
    if (!req.body.fullname || req.body.fullname.length < 8 || !isNaN(req.body.fullname)) {
        errors["fullname"] = "this is not a valid fullname!";
    }
    const emailRegEx = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    const doesEmailExist = await emailExists(req.body.email);
    if (!req.body.email || !emailRegEx.test(req.body.email) || doesEmailExist) {
        errors["email"] = "Wrong e-mail address!";
    }
    if (!req.body.about) {
        errors["about"] = "You have to choose!";
    } else {
        if (req.body.about.startsWith("other") && (!req.body.other || req.body.other.length < 5)) {
            console.log(req.body)
            errors["other"] = "You have to fill this box correctly!";
        }
    }
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    const password = req.body.password;
    if (!regex.test(password)) {
        errors["password"] = "Password must contain at least 8 caracters, 2 digits and 2 special caracters!";
    }
    if (password != req.body.password_c) {
        errors["password_c"] = "Password doesn't match!";
    }
    if (errors && Object.keys(errors).length > 0) {
        return res.status(422).send(errors);
    }
    else {
        next();
    }
};

module.exports = { checkNewUser }