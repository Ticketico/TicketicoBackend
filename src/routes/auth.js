const { LoginHandler, SignupHandler } = require("../controllers/AuthController");

module.exports = (fastify) => {
	fastify.post("/api/auth/login", async (request, reply) => {
		try {
			await LoginHandler(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
	fastify.post("/api/auth/signup", async (request, reply) => {
		try {
			await SignupHandler(request, reply, fastify);
		} catch (error) {
			console.error(error);
			reply.code(500).send({ message: "Internal Server Error ..." });
		}
	});
};
