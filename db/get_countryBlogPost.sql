-- select * from country_blog_posts where countries_id = $1;
-- select * from country_blog_posts join users on country_blog_posts.user_id = users.id where countries_id = $1;

select country_blog_posts.*, users.id as user_id, users.auth0_id, users.email, users.picture, users.username, users.about, users.country  from country_blog_posts join users on country_blog_posts.user_id = users.id where countries_id = $1;
