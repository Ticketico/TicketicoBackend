module.exports = (port, host) => {
	const fastify = require("fastify")({ logger: true });

	require("./plugins/postgres")(fastify)
		.then(() => {
			require("./routes/auth")(fastify);
			require("./routes/user")(fastify);
			require("./routes/product")(fastify);
			require("./routes/ticket")(fastify);
		})
		.catch((err) => {
			console.error(err);
		});

	fastify.listen({ port, host }, function (err) {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	});
};
