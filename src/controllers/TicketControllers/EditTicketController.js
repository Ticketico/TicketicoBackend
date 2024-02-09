const editTicket = async (request, reply, fastify) => {
	const { id } = request.params.id;
	const { description } = request.body;

	const updateTicketQueryString =
		"UPDATE tickets SET description=$1 WHERE id=$2";
	await fastify.pg.query(updateTicketQueryString, [description, id]);

	return reply.send({ message: "TES" });
};

module.exports = editTicket