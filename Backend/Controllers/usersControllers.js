const mysql = require("mysql2");
const env = require("dotenv");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

env.config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function emailExists(email) {
    const [rows] = await pool.query("SELECT id from user where email = ?", [email]);
    return rows.length > 0;
}

async function addNewUser(user) {
    const id = uuid.v4();
    let sql;
    let inputs = [id];
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    if (user.details) {
        sql = "INSERT INTO user (id,email,fullname,category, details) values (?,?,?,?,?,?)";
        inputs.push(user.email, user.fullname, user.about, user.other, password);
    } else {
        sql = "INSERT INTO user (id,email,fullname,category,user_password) values (?,?,?,?,?)";
        inputs.push(user.email, user.fullname, user.about, password);
    }
    const [result] = await pool.query(sql, inputs);
    let row2 = undefined;
    if (result && result.affectedRows > 0) {
        row2 = followAstrotech(id);
    }
    return row2 ? row2 : result;
}

async function followAstrotech(id) {
    const [row2] = await pool.query("INSERT INTO user_community (id_user , id_community) values (? ,?)", [id, 1]);
    let row3 = undefined;
    if (row2 && row2.affectedRows > 0) {
        [row3] = await pool.query("UPDATE community set nb_followers = nb_followers +1 where id = ?", [1]);
    }
    return row3 ? row3 : row2
}

async function getPassword(email) {
    const [rows] = await pool.query("SELECT user_password as password from user where email = ?", [email]);
    return rows[0];
}

async function getUserId(email) {
    const [rows] = await pool.query("SELECT id from user where email = ?", [email]);
    return rows[0];
}

async function setRefreshToken(id, token) {
    const res = await pool.query("UPDATE user SET refresh_token = ? where id = ?", [token, id]);
    return res;
}

async function refreshTokenExists(token) {
    const [res] = await pool.query("SELECT id from user where refresh_token = ?", [token]);
    return res.length > 0;
}

async function updateRefreshToken(id) {
    const [res] = await pool.query("update user set refresh_token = ? where id = ?", ["", id]);
    return res;
}

async function getUserProfile(id) {
    const [res] = await pool.query("SELECT fullname ,email, profile_pic as img , bio , nb_publications as publications , nb_likes as likes from user where id = ?", [id]);
    return res;
}

async function updateUser(id, inputs) {
    let sql = "";
    let params = [inputs.fullname];
    if (inputs?.bio) {
        params = [...params, inputs.bio];
        if (inputs?.new_psw) {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(inputs.new_psw, salt);
            params = [...params, password];
            sql = "UPDATE user set fullname = ?, bio = ? , user_password = ? where id = ?";
        } else {
            sql = "UPDATE user set fullname = ?, bio = ? where id = ?";
        }
    } else {
        if (inputs?.new_psw) {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(inputs.new_psw, salt);
            params = [...params, password];
            sql = "UPDATE user set fullname = ?, user_password = ? where id = ?";
        } else {
            sql = "UPDATE user set fullname = ? where id = ?";
        }
    }
    let row = undefined;
    if (sql) {
        params = [...params, id];
        [row] = await pool.query(sql, params);
    }
    return row;
}

async function isMyEmail(email) {
    const [rows] = await pool.query("SELECT id from user where email = ?", [email]);
    return rows.length > 0 && rows.email == email;
}

async function getPasswordById(id) {
    const [row] = await pool.query("SELECT user_password from user where id = ?", [id]);
    return row[0];
}

async function updateUserPicture(id, picture) {
    const [old_picture] = await pool.query("SELECT profile_pic from user where id = ?", [id]);
    if (old_picture && old_picture.length > 0) {
        const [row] = await pool.query("UPDATE user set profile_pic = ? where id = ?", [picture, id]);
    }
    return old_picture.length > 0 ? old_picture[0].profile_pic : undefined;
}

module.exports = { addNewUser, emailExists, getPassword, getUserId, setRefreshToken, refreshTokenExists, updateRefreshToken, getUserProfile, updateUser, isMyEmail, getPasswordById, updateUserPicture };