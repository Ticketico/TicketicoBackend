const bcrypt = require("bcrypt");

const HandleSignup = async (request, reply, fastify) => {
	const { username, password, confirmPassword } = request.body;

	doAllPasswordValidations(username, password, confirmPassword, reply);

	addUserToDB(fastify, username, password, reply);
};

module.exports = HandleSignup;

async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

function getDate() {
	return new Date().toISOString();
}

function getSignupQueryString() {
	return "INSERT INTO users (username,password,created_at) VALUES ($1,$2,$3)";
}

function getSignupQueryStringParams(username, password) {
	return [username, hashPassword(password), getDate()];
}

function checkUserExistance(error, reply) {
	if (error.detail.includes("already exists"))
		reply.code(400).send({ message: "UAE" });
}

function sendDefaultInternalServerError(reply) {
	reply.code(500).send({ message: "ISE" });
}

function sendSuccessMessage(reply) {
	reply.send({ message: "SS" });
}

function checkStrengthOfPassword(password, reply) {
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
	if (!regex.test(password)) reply.code(400).send({ message: "PAIW" });
}

function checkPasswordsMatch(password, confirmPassword, reply) {
	if (password !== confirmPassword) reply.code(400).send({ message: "PAICDM" });
}

function checkEnoughFields(username, password, confirmPassword) {
	if (!(username && password && confirmPassword))
		reply.code(400).send({ message: "NEF" });
}

function doAllPasswordValidations(username, password, confirmPassword, reply) {
	checkEnoughFields(username, password, confirmPassword, reply);
	checkPasswordsMatch(password, confirmPassword, reply);
	checkStrengthOfPassword(password, reply);
}

function addUserToDB(fastify, username, password, reply) {
	fastify.pg
		.query(
			getSignupQueryString(),
			getSignupQueryStringParams(username, password)
		)
		.then(() => {
			sendSuccessMessage(reply);
		})
		.catch((error) => {
			checkUserExistance(error, reply);
			sendDefaultInternalServerError(reply);
		});
}
