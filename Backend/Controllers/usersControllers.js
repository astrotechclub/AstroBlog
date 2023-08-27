const mysql = require("mysql2");
const env = require("dotenv");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const logger = require("../Middlewares/winstonLogger");

env.config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();



async function getStatsUsersCategory() {
    const [rows] = await pool.query("SELECT category, COUNT(*) as user_count FROM USER GROUP BY category");
    return rows;
}


async function getStatsUsersAdmin() {
    const [rows] = await pool.query("SELECT CASE WHEN is_admin = 1 THEN 'admin' ELSE 'simple user' END AS user_category, COUNT(*) AS user_count FROM USER GROUP BY user_category");
    return rows;
}


async function getAllUsers() {
    const [rows] = await pool.query("SELECT  id , email ,fullname,user_password, nb_publications, nb_likes, is_admin, profile_pic, category, details , bio from user");
    return rows;
}

async function deleteUser(id) {
    const [result] = await pool.query("DELETE FROM user WHERE id = ?", [id]);
    return result;
}

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
        logger.http(`New user has been inserted with id: ${id}`);
        row2 = followAstrotech(id);
    } else {
        logger.error(`failed inserting a new user`);
    }
    return row2 ? row2 : result;
}


async function addNewUserAdmin(user, profilePicFile) {
    const id = uuid.v4();
    let sql;
    let inputs = [id];
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);


    sql = "INSERT INTO user (id, email, fullname, category, user_password, bio, details, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let insertedData = [
        id,
        user.email,
        user.fullname,
        user.about,
        password,
        user.bio,
        user.details,
        profilePicFile.filename
    ];

    console.log(insertedData)

    try {
        const [result] = await pool.query(sql, insertedData);

        const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", id);
        if (rows.length > 0) {
            console.log(rows)
            return rows[0];
        } else {
            logger.error(`Failed to fetch the inserted user`);
            return null;
        }

    } catch (error) {
        logger.error(`Error inserting a new user: ${error.message}`);
        return null;
    }
}


async function editUser(user) {
    let sql;
    const password = await bcrypt.hash(user.user_password, 10); // Hash the password here

    console.log(editUser)
    console.log(user)
    sql = `
    UPDATE user
    SET email = ?, fullname = ?, category = ?, user_password = ?, bio = ?, details = ?
    WHERE id = ?;
`;
    let insertedData = [
        user.email,
        user.fullname,
        user.about,
        password,
        user.bio,
        user.details,
        user.id
    ];

    try {
        const [result] = await pool.query(sql, insertedData);

        const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", user.id);
        if (rows.length > 0) {
            return rows[0];
        } else {
            logger.error(`Failed to fetch the inserted user`);
            return null;
        }

    } catch (error) {
        logger.error(`Error updating user: ${error.message}`);
        return null;
    }
}

async function editUserWithPicture(user, profilePicFile) {
    let sql;
    const salt = await bcrypt.genSalt(10);
    const password = user.user_password ? await bcrypt.hash(user.user_password, salt) : '';


    console.log(user)
    sql = `
    UPDATE user
    SET email = ?, fullname = ?, category = ?, user_password = ?, bio = ?, details = ?, profile_pic = ?
    WHERE id = ?;
`
    let insertedData = [
        user.email,
        user.fullname,
        user.category,
        password,
        user.bio ? user.bio : '',
        user.details ? user.details : '',
        profilePicFile ? profilePicFile.filename : user.profile_pic,
        user.id
    ];

    console.log(insertedData)

    try {
        const [result] = await pool.query(sql, insertedData);

        const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", user.id);
        if (rows.length > 0) {
            console.log(rows)
            return rows[0];
        } else {
            logger.error(`Failed to fetch the inserted user`);
            return null;
        }

    } catch (error) {
        logger.error(`Error inserting a new user: ${error.message}`);
        return null;
    }
}



async function followAstrotech(id) {
    const [row2] = await pool.query("INSERT INTO user_community (id_user , id_community) values (? ,?)", [id, 1]);
    let row3 = undefined;
    if (row2 && row2.affectedRows > 0) {
        logger.http(`user: ${id} has followed the community 1`);
        [row3] = await pool.query("UPDATE community set nb_followers = nb_followers +1 where id = ?", [1]);
    } else {
        logger.error(`user: ${id} has failed to follow the community 1`);
    }
    if (row3) {
        logger.http(`user: ${id}, nb_followers of the community 1 has increased`);
    } else {
        logger.error(`user: ${user}, nb_followers of the community 1 has failed to increase`);
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

async function getUserProfileByName(name) {
    const [res] = await pool.query("SELECT fullname ,email, profile_pic as img , bio , nb_publications as publications , nb_likes as likes from user where fullname = ?", [name]);
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
        if (row) {
            logger.http(`user: ${id} has updated his infos with success`);
        } else {
            logger.error(`user: ${id} has failed to update his infos`);
        }
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
        if (row) {
            logger.http(`user: ${id} has updated his picture`);
        } else {
            logger.error(`user: ${id} has failed to update his picture`);
        }
    }
    return old_picture.length > 0 ? old_picture[0].profile_pic : undefined;
}

module.exports = { editUserWithPicture, editUser, getStatsUsersCategory, getStatsUsersAdmin, addNewUserAdmin, deleteUser, getAllUsers, addNewUser, emailExists, getPassword, getUserId, setRefreshToken, refreshTokenExists, updateRefreshToken, getUserProfile, updateUser, isMyEmail, getPasswordById, updateUserPicture, getUserProfileByName };