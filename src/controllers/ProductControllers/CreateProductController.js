const addNewProduct = async (request, reply, fastify) => {
	const { title, description, admin_id } = request.body;

	if (!checkEnoughFields(title)) return reply.code(400).send({ message: "NEF" });

	fastify.pg
		.query(
			getAddNewProductQueryString(),
			getAddNewProductQueryStringParams(title, description, admin_id)
		)
		.then(() => {
			return reply.send({ message: "PAS" });
		})
		.catch(() => {
			return reply.send({ message: "ISE" });
		});
};

module.exports = addNewProduct;

function checkEnoughFields(title, reply) {
	return !!title;
}
function getAddNewProductQueryString() {
	return "INSERT INTO products (title,description,admin_id,created_at) VALUES ($1,$2,$3,$4)";
}
function getAddNewProductQueryStringParams(title, description, admin_id) {
	return [title, description, admin_id, getDate()];
}
function getDate() {
	return new Date().toISOString();
}
