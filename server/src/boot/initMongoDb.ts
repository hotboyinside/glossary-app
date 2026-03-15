import fastifyMongo from '@fastify/mongodb';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import type { Db, MongoClient } from 'mongodb';
import migrateConfig from './initMigrateMongo';
import { vars } from '../config/vars';

interface MigrateMongo {
	config: { set: (config: typeof migrateConfig) => void };
	database: { connect: () => Promise<{ db: Db; client: MongoClient }> };
	up: (db: Db, client: MongoClient) => Promise<string[]>;
}

async function runMigrations(fastify: FastifyInstance) {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const mm = require('migrate-mongo') as Record<string, Promise<unknown>>;
	const config = (await mm['config']) as MigrateMongo['config'];
	const database = (await mm['database']) as MigrateMongo['database'];
	const up = (await mm['up']) as MigrateMongo['up'];

	config.set(migrateConfig);
	const { db, client } = await database.connect();
	const migrated = await up(db, client);
	migrated.forEach((name) => fastify.log.info(`Migrated: ${name}`));
	await client.close();
}

async function initMongoDb(fastify: FastifyInstance, _options: FastifyPluginOptions) {
	fastify.register(fastifyMongo, {
		url: vars.MONGO_URL,
	});

	fastify.addHook('onReady', async () => {
		await fastify.mongo.client.db().command({ ping: 1 });
		fastify.log.info('✅ MongoDB connected');
		await runMigrations(fastify);
	});
}

export default fastifyPlugin(initMongoDb);
