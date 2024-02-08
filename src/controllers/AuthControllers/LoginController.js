const bcrypt = require("bcrypt");

const HandleLogin = async (request, reply, fastify) => {
	const { username: enteredUsername, password: enteredPassword } = request.body;
	if (!enteredPassword || !enteredUsername)
		return reply.code(400).send({ message: "NEF" });

	const loginQueryString =
		"SELECT * FROM users WHERE (username=$1 AND (deleted_at IS NULL))";
	const loginQueryResult = await fastify.pg.query(loginQueryString, [
		enteredUsername,
	]);

	if (!loginQueryResult.rows.length)
		return reply.code(401).send({ message: "UNE" });

	const userObjectFromDB = loginQueryResult.rows[0];
	const userPasswordInDB = userObjectFromDB.password;
	const doPasswordsMatch = await bcrypt.compare(
		enteredPassword,
		userPasswordInDB
	);
	if (!doPasswordsMatch) return reply.code(401).send({ message: "WP" });

	delete userObjectFromDB.password;
	return reply.send({ message: userObjectFromDB });
};

module.exports = HandleLogin;
