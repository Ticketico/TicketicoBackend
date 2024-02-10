const bcrypt = require("bcrypt");

const HandleSignup = async (request, reply, fastify) => {
	const { username, password, confirmPassword } = request.body;

	if (!checkEnoughFields(username, password, confirmPassword))
		return reply.code(400).send({ message: "NEF" });
	if (!checkStrengthOfPassword(password))
		return reply.code(400).send({ message: "PAIW" });
	if (!checkPasswordsMatch(password, confirmPassword))
		return reply.code(400).send({ message: "PAICDM" });

	fastify.pg
		.query(
			getSignupQueryString(),
			getSignupQueryStringParams(username, password)
		)
		.then(() => {
			return reply.send({ message: "SS" });
		})
		.catch((error) => {
			if (checkUserExistance(error))
				return reply.code(400).send({ message: "UAE" });
			return reply.code(500).send({ message: "ISE" });
		});
};

module.exports = HandleSignup;

async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

function getDate() {
	return new Date().toISOString();
}

function getSignupQueryString() {
	return "INSERT INTO users (username,password,created_at,role) VALUES ($1,$2,$3,$4)";
}

function getSignupQueryStringParams(username, password) {
	return [username, hashPassword(password), getDate(), "user"];
}

function checkUserExistance(error) {
	return error.detail.includes("already exists");
}

function checkStrengthOfPassword(password) {
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
	return regex.test(password);
}

function checkPasswordsMatch(password, confirmPassword) {
	return password === confirmPassword;
}

function checkEnoughFields(username, password, confirmPassword) {
	return username && password && confirmPassword;
}
