update country_blog_posts set post = $1, stamp = $2 where id = $3;
select * from country_blog_posts;
-- select * from country_blog_posts join users on country_blog_posts.user_id = users.id where countries_id = $1;