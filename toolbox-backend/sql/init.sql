use toolbox;

create table IF NOT EXISTS cheatsheet
(
    id           int auto_increment
        primary key,
    title        varchar(20)   not null,
    language     varchar(10)   null,
    type         varchar(5)    not null comment '0 图片， 1 文本',
    text_content text          null,
    image_path   varchar(100)  null,
    tags         varchar(100)  null comment '"," 分割，由于 tag 只用于该功能，所以就不分表了',
    links        varchar(1000) null comment 'name@!@value,name@!@value,n@!@v'
);

create index cheatsheet_title_index
    on cheatsheet (title);



create table IF NOT EXISTS  leetcode
(
    id                 bigint auto_increment
        primary key,
    name               varchar(60)       not null comment '题目名称',
    link               varchar(200)      not null comment '题目链接',
    main_type          varchar(30)       not null comment '题目所属大类，比如链表，逻辑题，递归题.....',
    sub_type           varchar(30)       null comment '大题型下的细化题型，比如排序题型下分为：特殊排序，TOP K......',
    is_iconic          tinyint           not null comment '是否是细分题型的标志性题目: 0 否 1 是',
    level              tinyint           not null comment '0 Easy, 1 Medium, 2 Hard',
    status             tinyint default 0 not null comment '0 Todo，1 Solved',
    proficiency_rating tinyint default 0 not null comment '熟悉度评分: 0, 1, 2, 3, 4, 5',
    question_tags      varchar(30)       null comment '问题标签，用于各种标记目的：, 作为分隔符号',
    origin             varchar(30)       not null comment '题目来源'
);

create index leetcode_main_type_index
    on leetcode (main_type);


create table toolbox.entropylog
(
    id           bigint auto_increment
        primary key,
    type         tinyint                  not null comment '0 熵 1 逆向熵',
    update_count int                      not null comment '变动数值 > 0',
    create_date  date default (curdate()) not null
);

create index entropylog_create_date_index
    on toolbox.entropylog (create_date);

