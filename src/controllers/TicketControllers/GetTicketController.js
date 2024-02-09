const viewTicket = async (request, reply, fastify) => {
	const { id } = request.params.id;

	const viewNewTicketQueryString =
		"SELECT (id,title,description,created_at,deadline,submitter_id) FROM tickets WHERE (id=$1 AND (deleted_at IS NULL))";
	const viewNewTicketQueryResult = await fastify.pg.query(
		viewNewTicketQueryString,
		[id]
	);
	reply.send({ message: viewNewTicketQueryResult.rows[0] });
};
module.exports = viewTicket