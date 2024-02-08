const HandleLogin = require("../controllers/AuthControllers/LoginController");
const HandleSignup = require("../controllers/AuthControllers/SignupController");

module.exports = (fastify) => {
	fastify.post("/api/auth/login", (request, reply) => {
		HandleLogin(request, reply, fastify);
	});
	fastify.post("/api/auth/signup", (request, reply) => {
		HandleSignup(request, reply, fastify);
	});
};
