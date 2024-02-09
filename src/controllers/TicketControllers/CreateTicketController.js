const addNewTicket = async (request, reply, fastify) => {
	const { title, description, deadline, submitter_id, product_id, type } =
		request.body;

	if (!checkEnoughFields(title, deadline, submitter_id, product_id, type))
		return reply.code(400).send({ message: "NEF" });

	fastify.pg
		.query(
			getAddNewTicketQueryString(),
			getAddNewTicketQueryStringParams(
				title,
				description,
				deadline,
				submitter_id,
				product_id,
				type
			)
		)
		.then(() => {
			return reply.send({ message: "TAS" });
		})
		.catch(() => {
			return reply.code(400).send({ message: "ISE" });
		});
};

module.exports = addNewTicket;

function checkEnoughFields(title, deadline, submitter_id, product_id, type) {
	return title && deadline && submitter_id && product_id && type;
}
function getDate() {
	return new Date().toISOString();
}
function getAddNewTicketQueryString() {
	return "INSERT INTO tickets (title,description,deadline,submitter_id,product_id,type,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7)";
}
function getAddNewTicketQueryStringParams(
	title,
	description,
	deadline,
	submitter_id,
	product_id,
	type
) {
	return [
		title,
		description,
		deadline,
		submitter_id,
		product_id,
		type,
		getDate(),
	];
}
