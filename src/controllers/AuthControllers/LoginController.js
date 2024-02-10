const bcrypt = require("bcrypt");

const HandleLogin = async (request, reply, fastify) => {
	const { username, password } = request.body;

	if (!checkEnoughFields(username, password))
		return reply.code(400).send({ message: "NEF" });

	fastify.pg
		.query(getLoginQueryString(), getLoginQueryStringParams(username))
		.then((result) => {
			if (!checkUserExistance(result))
				return reply.code(401).send({ message: "UOPIW" });
			if (!checkIfPasswordsMatch(result, password))
				return reply.code(401).send({ message: "UOPIW" });
			const tailoredUserData = tailorUserData(result.rows[0]);
			return reply.send({ message: tailoredUserData });
		})
		.catch(() => {
			return reply.code(500).send({ message: "ISE" });
		});
};

module.exports = HandleLogin;

function checkEnoughFields(username, password) {
	return username && password;
}

function getLoginQueryString() {
	return "SELECT * FROM users WHERE (username=$1 AND (deleted_at IS NULL))";
}

function getLoginQueryStringParams(username) {
	return [username];
}

function checkUserExistance(result) {
	return result.rows.length;
}
async function checkIfPasswordsMatch(result, password) {
	const userHashedPasswordInDB = result.rows[0].password;
	const doPasswordsMatch = await bcrypt.compare(
		password,
		userHashedPasswordInDB
	);
	return doPasswordsMatch;
}

function tailorUserData(userObjectFromDB) {
	delete userObjectFromDB.password;
	delete userObjectFromDB.created_at;
	delete userObjectFromDB.deleted_at;
	return userObjectFromDB;
}
