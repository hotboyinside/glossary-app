import fastifyMongo from '@fastify/mongodb';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { vars } from '../config/vars';

async function initMongoDb(
	fastify: FastifyInstance,
	_options: FastifyPluginOptions,
) {
	fastify.register(fastifyMongo, {
		url: vars.MONGO_URL,
	});

	fastify.addHook('onReady', async () => {
		await fastify.mongo.client.db().command({ ping: 1 });
		fastify.log.info('✅ MongoDB connected');
	});
}

export default fastifyPlugin(initMongoDb);
