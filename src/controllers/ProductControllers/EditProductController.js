const editProduct = async (request, reply, fastify) => {
	const productId = request.params.id;
	const { description } = request.body;
	description = !!description ? description : "";

	const editProductQueryString =
		"UPDATE products SET description=$1 WHERE id=$3";
	await fastify.pg.query(editProductQueryString, [
		description,
		productId,
	]);
	return reply.send({ message: "PES" });
};
module.exports = editProduct;
