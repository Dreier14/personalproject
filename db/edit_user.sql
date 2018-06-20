update users
set email = ${email},
username = ${username},
picture = ${picture},
about = ${about}
where id = ${id};
SELECT * FROM users WHERE id = ${id};