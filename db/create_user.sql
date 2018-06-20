insert into users (auth0_id, email, picture, username)
values (${auth0_id}, ${email}, ${picture}, ${username})
returning *;