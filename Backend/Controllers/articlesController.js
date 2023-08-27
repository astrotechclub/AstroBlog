const mysql = require("mysql2");
const env = require("dotenv");
const logger = require("../Middlewares/winstonLogger");
env.config();

const user = process.env.ELASTICSEARCH_USERNAME
const psw = process.env.ELASTICSEARCH_PASSWORD

const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: 'https://localhost:9200',
    auth: {
        username: user,
        password: psw
    },
    ssl: {
        rejectUnauthorized: false,
    },
    tls: { rejectUnauthorized: false }
});



const indexName = process.env.ELASTICSEARCH_INDEX

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();





async function getNumArticlesPerCommunity(id) {
    const [result] = await pool.query("SELECT c.community_name, COUNT(a.id) AS num_articles FROM COMMUNITY c LEFT JOIN ARTICLE a ON c.id = a.community GROUP BY c.id, c.community_name");
    return result;
}

async function deleteArticle(id) {
    const [result] = await pool.query("DELETE FROM article WHERE id = ?", [id]);
    return result;
}

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




async function createArticleAdmin(article, article_img) {
    let insertData = [
        article.title,
        article_img.filename,
        article.article_description,
        article.content,
        article.author,
        article.community
    ]
    const [result] = await pool.query("INSERT INTO ARTICLE (title , article_img , article_description , content , author , community) VALUES (?,?,?,?,?,?)", insertData);
    const insertedId = result.insertId;
    const [rows] = await pool.query("SELECT a.id as id, u.email as email, u.fullname as username, u.id as user_id, c.id as community_id, u.profile_pic as profile_pic, community, title, article_description, date_time, article_img, a.nb_comments as nb_comments, a.nb_likes as nb_likes, a.nb_dislikes as nb_dislikes, content, c.community_name as community_name, c.profile_img as community_pic FROM ARTICLE a JOIN USER u ON a.author = u.id JOIN COMMUNITY c ON a.community = c.id WHERE a.id = ?", insertedId);
    return rows[0];
}



async function edit(article, article_img) {

    let insertData = [
        article.title,
        article_img ? article_img.filename : article.article_img,
        article.article_description,
        article.content,
        article.author,
        article.community,
        article.id
    ]
    const [result] = await pool.query("UPDATE ARTICLE SET title = ?, article_img = ?, article_description = ?, content = ?, author = ?, community = ? WHERE id = ?; ", insertData);
    const insertedId = article.id;
    const [rows] = await pool.query("SELECT a.id as id, u.email as email, u.fullname as username, u.id as user_id, c.id as community_id, u.profile_pic as profile_pic, community, title, article_description, date_time, article_img, a.nb_comments as nb_comments, a.nb_likes as nb_likes, a.nb_dislikes as nb_dislikes, content, c.community_name as community_name, c.profile_img as community_pic FROM ARTICLE a JOIN USER u ON a.author = u.id JOIN COMMUNITY c ON a.community = c.id WHERE a.id = ?", insertedId);
    return rows[0];
}


async function getAllOfArticles() {
    const [rows] = await pool.query("SELECT a.id as id, u.email as email,u.fullname as username, u.id as user_id, c.id as community_id, u.profile_pic as profile_pic , community, title, article_description, date_time , article_img, a.nb_comments as nb_comments, a.nb_likes as nb_likes, a.nb_dislikes as nb_dislikes, content , c.community_name as community_name , c.profile_img as community_pic  from article a join user u on a.author = u.id join community c on a.community = c.id  order by date_time desc");
    return rows;
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
        logger.http(`user: ${user} has insert in article ${row1.insertId}`);
        const combo = fields.map(f => `('${f}',${row1.insertId})`);
        [row2] = await pool.query("INSERT into field values " + combo.toString(), []);
    } else {
        logger.error(`user ${user} has failed inserting in article`);
    }
    let row3 = undefined;
    if ((fields && fields.length > 0 && row2 && row2.affectedRows > 0) || (row2 == undefined && row1 && row1.affectedRows > 0)) {
        logger.http(`user: ${user} has insert in field`);
        [row3] = await pool.query("UPDATE user set nb_publications = nb_publications + 1 where id = ?", [user]);
    }
    if (!row2) {
        logger.error(`user ${user} has failed inserting in field`);
    }
    let row35 = undefined;
    if (row3 && row3.affectedRows > 0) {
        logger.http(`user: ${user} has update his nb_publications`);
        [row35] = await pool.query("SELECT community_name from community where id = ?", article.community);
    } else {
        logger.error(`user: ${user} has failed updating his nb_publications`);
    }
    let row4 = undefined;
    if (row35 && row35.length > 0) {
        const title = `New article in ${row35[0].community_name} community`;
        const link = `/article/${row1.insertId}`;
        [row4] = await pool.query("INSERT INTO notif (title,picture,date_time,link) value (?,?,?,?)", [title, article.article_img, cdate, link]);
    }
    let row5 = undefined;
    if (row4 && row4.affectedRows > 0) {
        logger.http(`user: ${user} , insertion of notifications`);
        [row5] = await pool.query("INSERT INTO user_notif (id_user,id_notif) select id , ? from user where id != ? and id in (select id_user from user_community where id_community = ?)", [row4.insertId, user, article.community]);
    } else {
        logger.error(`user ${user} , insertion in notification has failed`);
    }
    if (!row5) logger.error(`user ${user} , insertion in user_notification as failed`);

    console.log("rani hna");

    await client.index({
        index: indexName,
        body: {
            title: article.title,
            content: article.article_description
        }
    })
    await client.indices.refresh({ index: indexName })
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
        logger.http(`user: ${user} has like/unlike the article ${id}`);
        if (params.action === "increase") {
            [row2] = await pool.query("UPDATE user set nb_likes = nb_likes +1 where fullname =? ", [params.author]);
        } else {
            [row2] = await pool.query("UPDATE user set nb_likes = nb_likes -1 where fullname =? ", [params.author]);
        }
    } else {
        logger.error(`user: ${user} has failed liking/unliking the article ${id}`);
    }
    let row3 = undefined;
    if (row2 && row2.affectedRows > 0) {
        logger.http(`user: ${user}, nb_likes of ${params.author} has changed`);
        if (params.action === "increase") {
            [row3] = await pool.query("UPDATE community set nb_likes = nb_likes +1 where community_name = ?", [params.community]);
        } else {
            [row3] = await pool.query("UPDATE community set nb_likes = nb_likes -1 where community_name = ?", [params.community]);

        }
    } else {
        logger.error(`user: ${user}, nb_likes of ${params.author} has failed to change`);
    }
    let row4 = undefined;
    if (row3 && row3.affectedRows > 0) {
        logger.http(`user: ${user}, nb_likes of community ${params.community} has changed`);
        if (params.action === "increase") {
            [row4] = await pool.query("INSERT INTO user_likes_article (user , article) value (?,?)", [user, id]);
        } else {
            [row4] = await pool.query("DELETE from user_likes_article where article = ? and user = ?", [id, user])
        }
    } else {
        logger.error(`user: ${user}, nb_likes of community ${params.community} has failed to change`);
    }
    if (row4) {
        logger.http(`user: ${user} had liked/unliked the article ${id}`);
    } else {
        logger.error(`user: ${user} had failed to like/unlike the article ${id}`);
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
        logger.http(`user: ${user}, nb_dislikes of the article ${id} has changed`);
        if (params.action === "increase") {
            [row4] = await pool.query("INSERT INTO user_dislikes_article (user , article) value (?,?)", [user, id]);
        } else {
            [row4] = await pool.query("DELETE from user_dislikes_article where article = ? and user = ?", [id, user])
        }
    } else {
        logger.error(`user: ${user}, nb_dislikes of the article ${id} has failed to change`);
    }
    if (row4) {
        logger.http(`user: ${user} has disliked/undisliked the article ${id}`);
    } else {
        logger.error(`user: ${user} has failed disliking/undisliking the article ${id}`);
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

module.exports = { edit, createArticleAdmin, getNumArticlesPerCommunity, deleteArticle, getAllOfArticles, getAllArticles, getArticle, getArticleWithContent, createArticle, updateLikes, getIfLikeArticle, updateDislikes, getIfDislikeArticle, getTopArticles, getUserArticles, getMyArticles, getCommunityArticles };