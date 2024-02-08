const bcrypt = require("bcrypt");

const LoginHandler = async (request, reply, fastify) => {
	const { username: enteredUsername, password: enteredPassword } = request.body;
	if (!enteredPassword || !enteredUsername)
		return reply.code(400).send({ message: "EF" });

	const loginQueryString = "SELECT * FROM users WHERE (username=$1 AND (deleted_at IS NULL))";
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

const SignupHandler = async (request, reply, fastify) => {
	const { username, password, confirmPassword } = request.body;
	if (password !== confirmPassword)
		return reply.code(400).send({ message: "PAICDM" });

	const date = new Date().toISOString();

	const hashedPassword = await bcrypt.hash(password, 10);
	const signupQueryString =
		"INSERT INTO users (username,password,created_at) VALUES ($1,$2,$3)";
	await fastify.pg.query(signupQueryString, [username, hashedPassword, date]);
	return reply.send({ message: "SS" });
};

module.exports = { LoginHandler, SignupHandler };
