module.exports = (fastify) => {
	return new Promise((res, rej) => {
		fastify
			.register(require("@fastify/cors"), {
				origin: "*",
				methods: ["GET", "POST", "DELETE", "PUT"],
			})
			.after((err) => {
				if (err) return rej(err);
				console.log("CORS Started ...");
				res();
			});
	});
};
