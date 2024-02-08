const bcrypt = require("bcrypt");

const editUser = async (request, reply, fastify) => {
	const {
		id,
		oldPassword: enteredOldPassword,
		newPassword,
		newPasswordConfirmation,
		picture,
	} = request.body;

	if (newPassword !== newPasswordConfirmation)
		return reply.code(400).send({ messgae: "PAICDM" });

	const viewUserQueryString =
		"SELECT password FROM users WHERE (id=$1 AND (deleted_at IS NULL))";
	const viewUserQueryResult = await fastify.pg.query(viewUserQueryString, [id]);
	const userCurrentPasswordInDB = viewUserQueryResult.rows[0].password;
	const doPasswordsMatch = await bcrypt.compare(
		enteredOldPassword,
		userCurrentPasswordInDB
	);
	if (!doPasswordsMatch) return reply.code(400).send({ messgae: "WP" });
	const hashedPassword = await bcrypt.hash(newPassword, 10);

	const updateUserQueryString =
		"UPDATE users SET password=$1, picture=$2 WHERE id=$3";
	await fastify.pg.query(updateUserQueryString, [hashedPassword, picture, id]);
	reply.send({ message: "UES" });
};

module.exports = { editUser };
