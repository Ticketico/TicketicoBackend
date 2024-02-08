const addNewProduct = async (request, reply, fastify) => {
	const { title, description, picture, admin_id } = request.body;
	if (!title) return reply.code(400).send({ message: "EF" });
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

const viewProduct = async (request, reply, fastify) => {
	const productId = request.params.id;
	const viewProductQueryString =
		"SELECT * FROM products WHERE (id=$1 AND (deleted_at IS NULL))";
	const viewProductQueryResult = await fastify.pg.query(
		viewProductQueryString,
		[productId]
	);
	return reply.send({ message: viewProductQueryResult.rows[0] });
};

const editProduct = async (request, reply, fastify) => {
	const productId = request.params.id;
	const { description, picture } = request.body;
	description = !!description ? description : "";
	picture = !!picture ? picture : "";
	const editProductQueryString =
		"UPDATE products SET description=$1, picture=$2 WHERE id=$3";
	await fastify.pg.query(editProductQueryString, [
		description,
		picture,
		productId,
	]);
	return reply.send({ message: "PES" });
};

const deleteProduct = async () => {
	const { id } = request.params.id;
	const editProductQueryString = "DELETE FROM products WHERE id=$3";
	await fastify.pg.query(editProductQueryString, [id]);
	reply.send({ message: "PDS" });
};

module.exports = { addNewProduct, viewProduct, editProduct, deleteProduct };
