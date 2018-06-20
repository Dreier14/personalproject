insert into backpackers_blog_posts (user_id, username, picture, post, stamp, topic_id) values 
($1, $2, $3, $4, $5, $6)RETURNING *;