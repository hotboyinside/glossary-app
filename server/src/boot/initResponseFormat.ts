import { FastifyError, FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

async function initResponseFormat(fastify: FastifyInstance) {
	fastify.setErrorHandler((error: FastifyError, _req, reply) => {
		const statusCode = error.statusCode ?? 500;
		if (statusCode >= 500) {
			fastify.log.error(error);
		}
		void reply.code(statusCode).send({
			error: {
				message: error.message,
				code: error.code ?? 'INTERNAL_ERROR',
			},
		});
	});
}

export default fastifyPlugin(initResponseFormat);
