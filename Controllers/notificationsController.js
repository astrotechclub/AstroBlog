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

async function getNotifications(user) {
    const [rows] = await pool.query("SELECT n.id, title , n.picture as img, n.date_time as date , link , u.seen from notif n join (select id_notif , seen from user_notif where id_user = ?) as u on u.id_notif = n.id order by date desc", [user]);
    return rows;
}

async function seeNotification(user, notif) {
    const [row] = await pool.query("UPDATE user_notif set seen = 1 where id_user = ? and id_notif = ?", [user, notif]);
    if (row) {
        logger.http(`user: ${user} has seen the notification ${notif}`);
    } else {
        logger.error(`user: ${user} has failed seeing the notification ${notif}`);
    }
    return row;
}

module.exports = { getNotifications, seeNotification };