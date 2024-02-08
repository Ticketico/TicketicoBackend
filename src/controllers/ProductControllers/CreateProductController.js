const addNewProduct = async (request, reply, fastify) => {
	const { title, description, picture, admin_id } = request.body;
	if (!title) return reply.code(400).send({ message: "NEF" });
	const date = new Date().toISOString();
	const addNewProductQueryString =
		"INSERT INTO products (title,description,picture,admin_id,created_at) VALUES ($1,$2,$3,$4)";
	await fastify.pg.query(addNewProductQueryString, [
		title,
		description,
		picture,
		admin_id,
		date,
	]);
	return reply.send({ message: "PAS" });
};
module.exports = addNewProduct