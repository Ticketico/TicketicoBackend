const {
	addNewProduct,
	viewProduct,
	editProduct,
	deleteProduct,
} = require("../controllers/ProductController");

module.exports = (fastify) => {
	fastify.post("/product", async (request, reply) => {
		try {
			await addNewProduct(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
	fastify.get("/product/:id", async (request, reply) => {
		try {
			await viewProduct(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
	fastify.put("/product/:id", async (request, reply) => {
		try {
			await editProduct(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
	fastify.delete("/product/:id", async (request, reply) => {
		try {
			await deleteProduct(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
};
