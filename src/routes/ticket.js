const {
	addNewTicket,
	viewTicket,
	editTicket,
	deleteTicket,
} = require("../controllers/TicketControllers/TicketController");

module.exports = (fastify) => {
	fastify.post("/api/ticket", async (request, reply) => {
		try {
			await addNewTicket(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
	fastify.put("/api/ticket/:id", async (request, reply) => {
		try {
			await editTicket(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
	fastify.delete("/api/ticket/:id", async (request, reply) => {
		try {
			await deleteTicket(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
	fastify.get("/api/ticket/:id", async (request, reply) => {
		try {
			await viewTicket(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
};
