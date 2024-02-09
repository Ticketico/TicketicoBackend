const deleteTicket = require("../controllers/TicketControllers/DeleteTicketController");
const addNewTicket = require("../controllers/TicketControllers/CreateTicketController");
const editTicket = require("../controllers/TicketControllers/EditTicketController");
const viewTicket = require("../controllers/TicketControllers/GetTicketController");

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
