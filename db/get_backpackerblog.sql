-- select * from backpackers_blog_posts where topic_id =$1;

select backpackers_blog_posts.*, users.id as user_id, users.auth0_id, users.email, users.picture, users.username, users.about, users.country  from backpackers_blog_posts join users on backpackers_blog_posts.user_id = users.id where topic_id = $1;