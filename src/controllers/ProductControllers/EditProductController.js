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
module.exports = editProduct;
