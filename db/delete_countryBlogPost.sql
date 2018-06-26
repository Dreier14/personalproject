DELETE FROM country_blog_posts WHERE id = $1;
-- SELECT * FROM country_blog_posts;

-- delete from country_blog_posts join users on country_blog_posts.user_id = users.id where countries_id = $1;