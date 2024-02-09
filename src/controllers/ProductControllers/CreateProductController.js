const addNewProduct = async (request, reply, fastify) => {
	const { title, description, picture, admin_id } = request.body;

	checkEnoughFields(title, reply);

	addNewProductToDB(title, description, picture, admin_id, fastify, reply);
};

module.exports = addNewProduct;

function checkEnoughFields(title, reply) {
	if (!title) reply.code(400).send({ message: "NEF" });
}
function getAddNewProductQueryString() {
	return "INSERT INTO products (title,description,picture,admin_id,created_at) VALUES ($1,$2,$3,$4,$5)";
}
function getAddNewProductQueryStringParams(
	title,
	description,
	picture,
	admin_id
) {
	return [title, description, picture, admin_id, new Date().toISOString()];
}

function addNewProductToDB(
	title,
	description,
	picture,
	admin_id,
	fastify,
	reply
) {
	fastify.pg
		.query(
			getAddNewProductQueryString(),
			getAddNewProductQueryStringParams(title, description, picture, admin_id)
		)
		.then(() => sendSuccessfulMessage(reply))
		.catch(() => sendErrorMessage(reply));
}
function sendSuccessfulMessage(reply) {
	reply.send({ message: "PAS" });
}
function sendErrorMessage(reply) {
	reply.send({ message: "ISE" });
}
