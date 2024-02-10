const deleteProduct = async () => {
	const { id } = request.params.id;
	const editProductQueryString = "DELETE FROM products WHERE id=$3";
	await fastify.pg.query(editProductQueryString, [id]);
	reply.send({ message: "PDS" });
};

module.exports = deleteProduct