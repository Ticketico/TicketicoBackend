const addNewProduct = require("../controllers/ProductControllers/CreateProductController");
const viewProduct = require("../controllers/ProductControllers/GetProductController");
const editProduct = require("../controllers/ProductControllers/editProductController");
const deleteProduct = require("../controllers/ProductControllers/DeleteProductController");

module.exports = (fastify) => {
	fastify.post("/api/product", (request, reply) => {
		addNewProduct(request, reply, fastify);
	});
	fastify.get("/api/product/:id", (request, reply) => {
		viewProduct(request, reply, fastify);
	});
	fastify.put("/api/product/:id", (request, reply) => {
		editProduct(request, reply, fastify);
	});
	fastify.delete("/api/product/:id", (request, reply) => {
		deleteProduct(request, reply, fastify);
	});
};
