const {
	addNewTicket,
	viewTicket,
	editTicket,
	deleteTicket,
} = require("../controllers/TicketControllers/TicketController");

module.exports = (fastify) => {
	fastify.post("/api/ticket", (request, reply) => {
		addNewTicket(request, reply, fastify);
	});
	fastify.put("/api/ticket/:id", (request, reply) => {
		editTicket(request, reply, fastify);
	});
	fastify.delete("/api/ticket/:id", (request, reply) => {
		deleteTicket(request, reply, fastify);
	});
	fastify.get("/api/ticket/:id", (request, reply) => {
		viewTicket(request, reply, fastify);
	});
};
