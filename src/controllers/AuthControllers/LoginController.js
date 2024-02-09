const bcrypt = require("bcrypt");

const HandleLogin = async (request, reply, fastify) => {
	const { username, password } = request.body;

	checkEnoughFields(username, password, reply);
	
	doLoginProcessWithDB(username, password, fastify, reply);
};

module.exports = HandleLogin;

function checkEnoughFields(username, password, reply) {
	if (!username || !password) reply.code(400).send({ message: "NEF" });
}

function getLoginQueryString() {
	return "SELECT * FROM users WHERE (username=$1 AND (deleted_at IS NULL))";
}

function getLoginQueryStringParams(username) {
	return [username];
}

function checkUserExistance(result, reply) {
	if (!result.rows.length) reply.code(401).send({ message: "UOPIW" });
}
async function checkIfPasswordsMatch(result, password, reply) {
	const userHashedPasswordInDB = result.rows[0].password;
	const doPasswordsMatch = await bcrypt.compare(
		password,
		userHashedPasswordInDB
	);
	if (!doPasswordsMatch) reply.code(401).send({ message: "UOPIW" });
}

function sendUserData(userObjectFromDB, reply) {
	delete userObjectFromDB.password;
	delete userObjectFromDB.created_at;
	delete userObjectFromDB.deleted_at;
	reply.send({ message: userObjectFromDB });
}
function sendDefaultError(reply) {
	reply.code(500).send({ message: "ISE" });
}
function doLoginProcessWithDB(username, password, fastify, reply) {
	fastify.pg
		.query(getLoginQueryString(), getLoginQueryStringParams(username))
		.then((result) => {
			checkUserExistance(result, reply);
			checkIfPasswordsMatch(result, password, reply);
			sendUserData(result.rows[0], reply);
		})
		.catch(() => {
			sendDefaultError(reply);
		});
}
