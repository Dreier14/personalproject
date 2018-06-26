update users
set email = ${email},
username = ${username},
picture = ${picture},
about = ${about},
country =${country}
where id = ${id};
SELECT * FROM users WHERE id = ${id};