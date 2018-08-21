drop table if exists country_blog_posts;

create table if not exists country_blog_posts(
    id serial primary key,
    user_id integer references users(id),
    username varchar(50), 
    picture text,
    countries_id integer,
    post text, 
    stamp timestamp without time zone 
);

drop table if exists backpackers_blog_posts;

create table if not exists backpackers_blog_posts(
    id serial primary key,
    user_id integer references users(id),
    username varchar(50), 
    topic_id integer,
    picture text, 
    post text, 
    stamp timestamp without time zone 
);

drop table if exists country;
create table if not exists country(
  id serial primary key,
  country text,
  info text,
  picture text
);

drop table if exists countries;
create table if not exists countries (
  id serial primary key,
  country text,
  pictures text,
  
);

drop table if exists cities;
create table if not exists cities(
  id serial primary key,
  country_id integer references country(id),
  info text,
  cities text,
  pictures text
);

drop table if exists users;

create table if not exists users (
  id serial primary key,
  auth0_id text unique,
  email text,
  picture text,
  username text,
  about text,
  country text
);

drop table if exists backpacker_blog_topics;
create table if not exists backpacker_blog_topics(
  id serial primary key,
  topics text,
  picture text
);
