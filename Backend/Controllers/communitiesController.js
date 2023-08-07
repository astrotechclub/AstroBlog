const mysql = require("mysql2");
const env = require("dotenv");
env.config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getAllCommunities() {
    const [rows] = await pool.query("SELECT * from community");
    return rows;
}

async function getCommunity(id, user) {
    let [rows] = await pool.query("SELECT * from community where id = ?", [id]);
    const [row] = await pool.query("SELECT id_user from USER_COMMUNITY where id_user = ? and id_community = ?", [user, id]);
    const isFollower = row[0] ? true : false;
    rows[0] = { ...rows[0], "isFollower": isFollower };
    return rows;
}

async function getUserCommunities(id) {
    const [rows] = await pool.query("SELECT id , profile_img as img , community_name as name , nb_likes as likes , nb_followers as followers from community where id in (select id_community from user_community where id_user = ?) ", [id]);
    return rows;
}

async function getUserSuggestions(id) {
    const [rows] = await pool.query("SELECT id , profile_img as img , community_name as name , nb_likes as likes , nb_followers as followers from community where id not in (select id_community from user_community where id_user = ?) ", [id]);
    return rows;
}

async function unfollowCommunity(community, user) {
    const [row1] = await pool.query("UPDATE community set nb_followers = nb_followers-1 where id = ?", [community]);
    let row2 = undefined;
    if (row1 && row1.affectedRows > 0) {
        [row2] = await pool.query("DELETE FROM user_community where id_user = ? and id_community = ? ", [user, community]);
    }
    return row2 ? row2 : row1;
}

async function followCommunity(community, user) {
    const [row1] = await pool.query("UPDATE community set nb_followers = nb_followers+1 where id = ?", [community]);
    let row2 = undefined;
    if (row1 && row1.affectedRows > 0) {
        [row2] = await pool.query("INSERT into user_community (id_user , id_community) value (?,?)", [user, community]);
    }
    return row2 ? row2 : row1;
}

async function getUsers(id) {
    const [rows] = await pool.query("SELECT id , fullname , nb_likes, nb_publications , profile_pic from user where id in (SELECT id_user from USER_COMMUNITY where id_community = ?) ", [id]);
    return rows;
}

module.exports = { getAllCommunities, getCommunity, getUserCommunities, getUserSuggestions, unfollowCommunity, followCommunity, getUsers };