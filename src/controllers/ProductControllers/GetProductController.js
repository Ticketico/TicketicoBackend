const viewProduct = async (request, reply, fastify) => {
	const productId = request.params.id;

	fastify.pg
		.query(
			getViewProductQueryString(),
			getViewProductQueryStringParams(productId)
		)
		.then((result) => {
			sendProductData(reply, result.rows[0]);
		})
		.catch(() => {
			sendDefaultError(reply);
		});
};

module.exports = viewProduct;

function getViewProductQueryString() {
	return "SELECT * FROM products WHERE (id=$1 AND (deleted_at IS NULL))";
}
function getViewProductQueryStringParams(productId) {
	return [productId];
}
function sendDefaultError(reply) {
	reply.code(400).send({ message: "ISE" });
}
function sendProductData(reply, productObjectFromDB) {
	delete productObjectFromDB.deleted_at;
	delete productObjectFromDB.created_at;
	delete productObjectFromDB.admin_id;
	reply.send({ message: productObjectFromDB });
}
