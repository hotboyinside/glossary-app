import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { KeywordsRepository } from '../repositories/keywords';

const initRepositories = async (fastify: FastifyInstance) => {
	const db = fastify.mongo.db;

	if (!db) {
		throw new Error('MongoDB is not initialized');
	}

	fastify.decorate('keywordsRepository', new KeywordsRepository(db));
};

export default fastifyPlugin(initRepositories);
