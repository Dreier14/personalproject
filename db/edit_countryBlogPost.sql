update country_blog_posts set post = $1, stamp = $2 where id = $3
RETURNING *;