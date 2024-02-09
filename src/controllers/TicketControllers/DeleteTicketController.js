const deleteTicket = async (request, reply, fastify) => {
	const { id } = request.params.id;

	const deleteTicketQueryString = "DELETE FROM tickets WHERE id=$1";
	await fastify.pg.query(deleteTicketQueryString, [id]);

	return reply.send({ message: "TD    S" });
};

module.exports = deleteTicket