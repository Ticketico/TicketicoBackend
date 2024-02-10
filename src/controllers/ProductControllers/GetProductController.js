const viewProduct = async (request, reply, fastify) => {
	const productId = request.params.id;

	fastify.pg
		.query(
			getViewProductQueryString(),
			getViewProductQueryStringParams(productId)
		)
		.then((result) => {
			const tailoredProductData = tailorProductData(result.rows[0]);
			return reply.send({ message: tailoredProductData });
		})
		.catch(() => {
			return reply.code(400).send({ message: "ISE" });
		});
};

module.exports = viewProduct;

function getViewProductQueryString() {
	return "SELECT * FROM products WHERE (id=$1 AND (deleted_at IS NULL))";
}
function getViewProductQueryStringParams(productId) {
	return [productId];
}
function tailorProductData(productObjectFromDB) {
	delete productObjectFromDB.deleted_at;
	delete productObjectFromDB.admin_id;
	return productObjectFromDB;
}
