const mysql = require("mysql2");
const env = require("dotenv");
const logger = require("../Middlewares/winstonLogger");
env.config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getAllComments() {
    const [rows] = await pool.query("SELECT c.id ,article,u.id as user_id , u.fullname as user_name , u.nb_publications as user_publications ,u.nb_likes as user_likes , u.profile_pic as user_pic , DATE_FORMAT(date_time, '%M %e, %Y') as date , DATE_FORMAT(date_time, '%H:%i') as time  , comment_text as text from comment as c join user u on u.id = c.user order by date_time desc");
    return rows;
}

async function deleteComment(id) {
    const [result] = await pool.query("DELETE FROM comment WHERE id = ?", [id]);
    return result;
}



async function getAllOfComments() {
    const [rows] = await pool.query("SELECT c.id as id, c.article as articleId, c.user as userId, c.date_time as date_time, comment_text , u.email , u.profile_pic, u.fullname as username , a.article_img as article_img , a.title as title from comment c join user u on u.id = c.user join article a on a.id = c.article  order by date_time desc");
    return rows;
}

async function getArticleComments(id) {
    const [rows] = await pool.query("SELECT c.id ,article,u.id as user_id, u.fullname as user_name , u.nb_publications as user_publications ,u.nb_likes as user_likes , u.profile_pic as user_pic , DATE_FORMAT(date_time, '%M %e, %Y') as date , DATE_FORMAT(date_time, '%H:%i') as time  , comment_text as text from comment as c join user u on u.id = c.user where article = ? order by date_time desc", [id]);
    return rows;
}

async function AddComment(user, comment, article) {
    const cdate = new Date(Date.now());
    const [row1] = await pool.query("INSERT into comment (article , user , date_time , comment_text) value (?, ? , ? ,?)", [article, user, cdate, comment.comment_text]);
    let row2 = undefined;
    if (row1 && row1.affectedRows > 0) {
        logger.http(`user: ${user} has commented the article ${article}`);
        [row2] = await pool.query("UPDATE article set nb_comments = nb_comments +1 where id = ?", [article]);
    } else {
        logger.error(`user: ${user} has failed to comment the article ${article}`);
    }
    if (row2) {
        logger.http(`user: ${user}, nb_comments of the article ${comment} has increased`);
    } else {
        logger.error(`user: ${user}, nb_comments of the article ${comment} has failed to increase`);
    }
    return row2 ? row2 : row1;
}

async function getMaxComments(id, max) {
    const [rows] = await pool.query("SELECT c.id ,article,u.id as user_id, u.fullname as user_name , u.nb_publications as user_publications ,u.nb_likes as user_likes , u.profile_pic as user_pic , DATE_FORMAT(date_time, '%M %e, %Y') as date , DATE_FORMAT(date_time, '%H:%i') as time  , comment_text as text from comment as c join user u on u.id = c.user where article = ? order by date_time desc limit ?", [id, max]);
    return rows;
}

module.exports = {deleteComment, getAllOfComments, getAllComments, getArticleComments, AddComment, getMaxComments };