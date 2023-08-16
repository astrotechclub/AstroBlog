CREATE DATABASE IF NOT EXISTS astroblog_db;
USE astroblog_db;

CREATE TABLE IF NOT EXISTS USER(
    id varchar(40) primary key,
    email varchar(35) not null,
    fullname varchar(40) not null,
    nb_publications int not null default 0,
    nb_likes int not null default 0,
    is_admin bool not null default 0,
    profile_pic varchar(40) not null default "d8d3404fc80f99d5f4bf943d054dd772",
    category varchar(15) not null,
    details varchar(100),
    user_password varchar(100) not null,
    refresh_token varchar(255),
    bio varchar(255)
);

CREATE TABLE IF NOT EXISTS COMMUNITY(
    id int primary key AUTO_INCREMENT,
    community_name varchar(100) not null,
    community_description varchar(200),
    profile_img varchar(40) not null,
    nb_followers int not null default 0,
    nb_likes int not null default 0
);

CREATE TABLE IF NOT EXISTS ARTICLE(
    id int primary key AUTO_INCREMENT,
    author varchar(40) not null,
    community int not null,
    title varchar(50) not null,
    article_description varchar(255) not null,
    date_time datetime not null,
    article_img varchar(200),
    nb_comments int not null default 0,
    nb_likes int not null default 0,
    nb_dislikes int not null default 0,
    content text not null,
    foreign key (author) references USER (id),
    foreign key (community) references COMMUNITY(id)
);

CREATE TABLE IF NOT EXISTS FIELD(
    field_name varchar(50) not null,
    article int not null,
    foreign key (article) references article(id),
    primary key (field_name , article)
);

CREATE TABLE IF NOT EXISTS USER_COMMUNITY(
    id_community int not null,
    id_user varchar(40) not null,
    foreign key (id_community) references community(id),
    foreign key(id_user) references user(id),
    primary key (id_community , id_user)
);

CREATE TABLE IF NOT EXISTS COMMENT(
    id int not null primary key AUTO_INCREMENT,
    article int not null,
    user varchar(40) not null ,
    date_time datetime not null,
    comment_text varchar(255) not null,
    foreign key (user) references user(id),
    foreign key (article) references article(id)
);

CREATE TABLE IF NOT EXISTS USER_LIKES_ARTICLE(
    user varchar(40) not null,
    article int not null,
    foreign key (user) references user(id),
    foreign key (article) references article(id),
    primary key (user , article)
);

CREATE TABLE IF NOT EXISTS USER_DISLIKES_ARTICLE(
    user varchar(40) not null,
    article int not null,
    foreign key (user) references user(id),
    foreign key (article) references article(id),
    primary key (user , article)
);

CREATE TABLE IF NOT EXISTS NOTIF(
    id int not null AUTO_INCREMENT primary key,
    title varchar(100) not null,
    picture varchar(200) not null,
    date_time datetime not null,
    link varchar(20) not null
);

CREATE TABLE IF NOT EXISTS USER_NOTIF(
    id_notif int not null,
    id_user varchar(40) not null,
    seen bool not null default 0,
    primary key(id_notif , id_user),
    foreign key (id_notif) references  NOTIF(id),
    foreign key (id_user) references USER(id)
);