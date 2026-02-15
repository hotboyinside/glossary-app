import fastifyAutoload from '@fastify/autoload';
import cors from '@fastify/cors';
import Fastify, { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { join } from 'path';
import initMongoDb from './boot/initMongoDb';
import initRepositories from './boot/initRepositories';
import { loggerConfig } from './config/logger';
import { vars } from './config/vars';

async function serviceApp(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions,
) {
	fastify.register(fastifyAutoload, {
		dir: join(__dirname, 'routes'),
		autoHooks: true,
		cascadeHooks: true,
		options: { ...opts },
	});
}

const app = Fastify({
	logger: loggerConfig,
	connectionTimeout: 120_000,
	requestTimeout: 60_000,
	keepAliveTimeout: 10_000,
	http: {
		headersTimeout: 15_000,
	},
	ajv: {
		customOptions: {
			coerceTypes: 'array',
			removeAdditional: 'all',
		},
	},
});

app.register(cors, {
	origin: vars.FRONTEND_URL,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true,
});
app.register(initMongoDb);
app.register(initRepositories);
app.register(fp(serviceApp));

const start = async () => {
	try {
		await app.listen({ port: vars.PORT, host: '0.0.0.0' });

		const address = app.server.address();
		const port = typeof address === 'string' ? address : address?.port;
		app.log.info(`Port is ${port}`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
