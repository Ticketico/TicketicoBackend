const { LoginHandler, SignupHandler } = require("../controllers/TicketController");

module.exports = (fastify) => {
	fastify.post("/ticket", async (request, reply) => {
		try {
			await LoginHandler(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
	fastify.put("/ticket/:id", async (request, reply) => {
		try {
			await SignupHandler(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
    fastify.delete("/ticket/:id", async (request, reply) => {
		try {
			await SignupHandler(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
    fastify.get("/ticket/:id", async (request, reply) => {
		try {
			await SignupHandler(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
};
