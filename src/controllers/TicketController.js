const addNewTicket = async (request, reply, fastify) => {
	const { title, description, deadline, submitter_id } = request.body;

	if (!title) return reply.code(400).send({ message: "EF" });

	const date = new Date().toISOString();
	const addNewTicketQueryString =
		"INSERT INTO tickets (title,description,deadline,submitter_id,created_at) VALUES ($1,$2,$3,$4,$5)";
	await fastify.pg.query(addNewTicketQueryString, [
		title,
		description,
		deadline,
		submitter_id,
		date,
	]);

	return reply.send({ message: "TAS" });
};
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
const editTicket = async (request, reply, fastify) => {
	const { id } = request.params.id;
	const { description } = request.body;

	const updateTicketQueryString =
		"UPDATE tickets SET description=$1 WHERE id=$2";
	await fastify.pg.query(updateTicketQueryString, [description, id]);

	return reply.send({ message: "TES" });
};
const deleteTicket = async (request, reply, fastify) => {
	const { id } = request.params.id;

	const deleteTicketQueryString = "DELETE FROM tickets WHERE id=$1";
	await fastify.pg.query(deleteTicketQueryString, [id]);

	return reply.send({ message: "TD    S" });
};

module.exports = { addNewTicket, viewTicket, editTicket, deleteTicket };
