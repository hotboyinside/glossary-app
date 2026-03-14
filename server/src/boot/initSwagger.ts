import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

async function initSwagger(fastify: FastifyInstance) {
	await fastify.register(swagger, {
		openapi: {
			openapi: '3.0.0',
			info: {
				title: 'Glossary API',
				description: 'Meta-platform glossary REST API',
				version: '1.0.0',
			},
		},
	});

	await fastify.register(swaggerUi, {
		routePrefix: '/docs',
		indexPrefix: '/api',
	});
}

export default fastifyPlugin(initSwagger);
