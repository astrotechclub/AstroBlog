const mysql = require("mysql2");
const env = require("dotenv");
env.config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getAllArticles() {
    const [rows] = await pool.query("SELECT R.id, title, description,date_time, date, time, img, comments, article_likes , article_dislikes,user_id , user_name, user_profile, user_likes, user_publications, c.community_name , c.id as community_id , c.profile_img as community_profile FROM(SELECT a.id, title, article_description as description,date_time, DATE_FORMAT(date_time, '%M %e, %Y') as date, DATE_FORMAT(date_time, '%H:%i') as time, article_img as img, nb_comments as comments, a.nb_likes as article_likes , nb_dislikes as article_dislikes, fullname as user_name,u.id as user_id, profile_pic as user_profile, u.nb_likes as user_likes, nb_publications as user_publications, community  FROM article a join user u on a.author = u.id) as R join community c on c.id = R.community order by date_time  desc");
    let articles = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        const id = row.id;
        const fields = await getArticleFields(id);
        row["fields"] = fields.map(t => t.field_name);
        articles.push(row);
    }
    return articles;
}

async function getArticleFields(id) {
    const [rows] = await pool.query("SELECT field_name FROM field WHERE article = ?", [id]);
    return rows
}

async function getArticleWithContent(id) {
    const [row] = await pool.query("SELECT R.id, title, description,date_time, date, time, img, comments, article_likes , article_dislikes, content, user_name, user_id, user_profile, user_likes, user_publications, c.community_name , c.id as community_id , c.profile_img as community_profile FROM(SELECT a.id, title, article_description as description,date_time, DATE_FORMAT(date_time, '%M %e, %Y') as date, DATE_FORMAT(date_time, '%H:%i') as time, article_img as img, nb_comments as comments, a.nb_likes as article_likes , nb_dislikes as article_dislikes, content, fullname as user_name,u.id as user_id, profile_pic as user_profile, u.nb_likes as user_likes, nb_publications as user_publications, community  FROM article a join user u on a.author = u.id where a.id = ?) as R join community c on c.id = R.community order by date_time desc", [id]);
    if (row[0]) {
        let article = row[0];
        const fields = await getArticleFields(id);
        article["fields"] = fields.map(t => t.field_name);
        article["reviews"] = parseInt(article.article_likes) + parseInt(article.article_dislikes);
        return article;
    }
    return row;
}

async function getArticle(id) {
    const [row] = await pool.query("select * from article where id = ?", [id]);
    return row;
}

async function createArticle(article, user) {
    const cdate = new Date(Date.now());
    const fields = article.fields;
    const [row1] = await pool.query("INSERT into article (author , community , date_time, title , article_description , article_img , content) values (? , ? ,? ,? ,? , ? , ?) ", [user, article.community, cdate, article.title, article.article_description, article.article_img, article.content]);
    let row2 = undefined;
    if (row1.affectedRows > 0 && fields && fields.length > 0) {
        const combo = fields.map(f => `('${f}',${row1.insertId})`);
        [row2] = await pool.query("INSERT into field values " + combo.toString(), []);
    }
    let row3 = undefined;
    if ((fields && fields.length > 0 && row2 && row2.affectedRows > 0) || (row2 == undefined && row1 && row1.affectedRows > 0)) {
        [row3] = await pool.query("UPDATE user set nb_publications = nb_publications + 1 where id = ?", [user]);
    }
    let row35 = undefined;
    if (row3 && row3.affectedRows > 0) {
        [row35] = await pool.query("SELECT community_name from community where id = ?", article.community);
    }
    let row4 = undefined;
    if (row35 && row35.length > 0) {
        const title = `New article in ${row35[0].community_name} community`;
        const link = `/article/${row1.insertId}`;
        [row4] = await pool.query("INSERT INTO notif (title,picture,date_time,link) value (?,?,?,?)", [title, article.article_img, cdate, link]);
    }
    let row5 = undefined;
    if (row4 && row4.affectedRows > 0) {
        [row5] = await pool.query("INSERT INTO user_notif (id_user,id_notif) select id , ? from user where id != ? and id in (select id_user from user_community where id_community = ?)", [row4.insertId, user, article.community]);
    }
    return row5 ? row5 : row4 ? row4 : row3 ? row3 : row2 ? row2 : row1;
}

async function updateLikes(id, user, params) {
    let row1 = undefined;
    if (params.action === "increase") {
        [row1] = await pool.query("UPDATE article set nb_likes = nb_likes +1 where id =? ", [id]);
    } else {
        [row1] = await pool.query("UPDATE article set nb_likes = nb_likes -1 where id =? ", [id]);
    }
    let row2 = undefined;
    if (row1 && row1.affectedRows > 0) {
        if (params.action === "increase") {
            [row2] = await pool.query("UPDATE user set nb_likes = nb_likes +1 where fullname =? ", [params.author]);
        } else {
            [row2] = await pool.query("UPDATE user set nb_likes = nb_likes -1 where fullname =? ", [params.author]);
        }
    }
    let row3 = undefined;
    if (row2 && row2.affectedRows > 0) {
        if (params.action === "increase") {
            [row3] = await pool.query("UPDATE community set nb_likes = nb_likes +1 where community_name = ?", [params.community]);
        } else {
            [row3] = await pool.query("UPDATE community set nb_likes = nb_likes -1 where community_name = ?", [params.community]);

        }
    }
    let row4 = undefined;
    if (row3 && row3.affectedRows > 0) {
        if (params.action === "increase") {
            [row4] = await pool.query("INSERT INTO user_likes_article (user , article) value (?,?)", [user, id]);
        } else {
            [row4] = await pool.query("DELETE from user_likes_article where article = ? and user = ?", [id, user])
        }
    }
    return row4 ? row4 : row3 ? row3 : row2 ? row2 : row1;
}

async function getIfLikeArticle(id, user) {
    const [row] = await pool.query("SELECT count(article) as nb from user_likes_article where article = ? and user = ?", [id, user]);
    if (row && row[0]) return row[0]?.nb && row[0].nb == 1 ? true : false;
    return row;
}

async function updateDislikes(id, user, params) {
    let row1 = undefined;
    if (params.action === "increase") {
        [row1] = await pool.query("UPDATE article set nb_dislikes = nb_dislikes +1 where id =? ", [id]);
    } else {
        [row1] = await pool.query("UPDATE article set nb_dislikes = nb_dislikes -1 where id =? ", [id]);
    }

    let row4 = undefined;
    if (row1 && row1.affectedRows > 0) {
        if (params.action === "increase") {
            [row4] = await pool.query("INSERT INTO user_dislikes_article (user , article) value (?,?)", [user, id]);
        } else {
            [row4] = await pool.query("DELETE from user_dislikes_article where article = ? and user = ?", [id, user])
        }
    }
    return row4 ? row4 : row1;
}


async function getIfDislikeArticle(id, user) {
    const [row] = await pool.query("SELECT article,user , count(article) as nb from user_dislikes_article where article = ? and user = ?", [id, user]);
    if (row && row[0]) return row[0]?.nb && row[0].nb == 1 ? true : false;
    return row;
}

async function getTopArticles() {
    let [rows] = await pool.query("SELECT id , DATE(date_time) as date_stamp , article_img as img , DATE_FORMAT(date_time, '%M %e, %Y') as date, DATE_FORMAT(date_time, '%H:%i') as time, nb_comments as comments , nb_likes , nb_dislikes , title , article_description as description , nb_likes + nb_dislikes + nb_comments as total from article order by date_stamp desc , total desc  limit 3", []);
    for (let i = 0; i < rows.length; i++) {
        const [dfields] = await pool.query("SELECT field_name from field where article = ?", [rows[i].id]);
        const fields = dfields.map(f => f.field_name);
        rows[i] = { ...rows[i], "fields": fields };
    }
    return rows;
}

async function getUserArticles(user, max) {
    const [rows] = await pool.query("SELECT R.id, title, description,date_time, date, time, img, comments, article_likes , article_dislikes, user_name,user_id, user_profile, user_likes, user_publications, c.community_name , c.id as community_id , c.profile_img as community_profile FROM(SELECT a.id, title, article_description as description,date_time, DATE_FORMAT(date_time, '%M %e, %Y') as date, DATE_FORMAT(date_time, '%H:%i') as time, article_img as img, nb_comments as comments, a.nb_likes as article_likes , nb_dislikes as article_dislikes, fullname as user_name,u.id as user_id, profile_pic as user_profile, u.nb_likes as user_likes, nb_publications as user_publications, community  FROM article a join user u on a.author = u.id) as R join (select * from community where id in (select id_community from user_community where id_user = ?))as c on c.id = R.community order by date_time  desc limit ?", [user, max]);
    let articles = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        const id = row.id;
        const fields = await getArticleFields(id);
        row["fields"] = fields.map(t => t.field_name);
        articles.push(row);
    }
    return articles;
}

async function getMyArticles(user, max) {
    const [rows] = await pool.query("SELECT R.id, title, description,date_time, date, time, img, comments, article_likes , article_dislikes, user_name,user_id, user_profile, user_likes, user_publications, c.community_name , c.id as community_id , c.profile_img as community_profile FROM(SELECT a.id, title, article_description as description,date_time, DATE_FORMAT(date_time, '%M %e, %Y') as date, DATE_FORMAT(date_time, '%H:%i') as time, article_img as img, nb_comments as comments, a.nb_likes as article_likes , nb_dislikes as article_dislikes, fullname as user_name,u.id as user_id, profile_pic as user_profile, u.nb_likes as user_likes, nb_publications as user_publications, community  FROM article a join (select * from user where id = ? )as u on a.author = u.id) as R join community c on c.id = R.community order by date_time  desc limit ?", [user, max]);
    let articles = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        const id = row.id;
        const fields = await getArticleFields(id);
        row["fields"] = fields.map(t => t.field_name);
        articles.push(row);
    }
    return articles;
}
async function getCommunityArticles(id, max) {
    const [rows] = await pool.query("SELECT R.id, title, description,date_time, date, time, img, comments, article_likes , article_dislikes, user_name,user_id, user_profile, user_likes, user_publications, c.community_name , c.id as community_id , c.profile_img as community_profile FROM(SELECT a.id, title, article_description as description,date_time, DATE_FORMAT(date_time, '%M %e, %Y') as date, DATE_FORMAT(date_time, '%H:%i') as time, article_img as img, nb_comments as comments, a.nb_likes as article_likes , nb_dislikes as article_dislikes, fullname as user_name,u.id as user_id, profile_pic as user_profile, u.nb_likes as user_likes, nb_publications as user_publications, community  FROM article a join user u on a.author = u.id) as R join (select * from community where id = ? ) as c on c.id = R.community order by date_time  desc limit ?", [id, max]);
    let articles = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        const id = row.id;
        const fields = await getArticleFields(id);
        row["fields"] = fields.map(t => t.field_name);
        articles.push(row);
    }
    return articles;
}

module.exports = { getAllArticles, getArticle, getArticleWithContent, createArticle, updateLikes, getIfLikeArticle, updateDislikes, getIfDislikeArticle, getTopArticles, getUserArticles, getMyArticles, getCommunityArticles };