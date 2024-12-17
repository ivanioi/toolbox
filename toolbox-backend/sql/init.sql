create table IF NOT EXISTS cheatsheet
(
    id           int auto_increment
        primary key,
    title        varchar(100)  not null,
    language     varchar(10)  null,
    type         tinyint      not null comment '0 图片， 1 文本',
    text_content text         null,
    image_path   varchar(100) null,
    tags         varchar(100) null comment '"," 分割，由于 tag 只用于该功能，所以就不分表了'
);

