const addNewTicket = async (request, reply, fastify) => {
	const { title, description, deadline, submitter_id, product_id, type } =
		request.body;

	if (!title) return reply.code(400).send({ message: "NEF" });

	const date = new Date().toISOString();
	const addNewTicketQueryString =
		"INSERT INTO tickets (title,description,deadline,submitter_id,product_id,type,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7)";
	await fastify.pg.query(addNewTicketQueryString, [
		title,
		description,
		deadline,
		submitter_id,
		product_id,
		type,
		date,
	]);

	return reply.send({ message: "TAS" });
};
module.exports = addNewTicket;
