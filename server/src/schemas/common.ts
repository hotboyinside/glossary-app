import { Type } from '@fastify/type-provider-typebox';

export const MongoId = () =>
	Type.String({ pattern: '^[a-f\\d]{24}$', description: 'MongoDB ObjectId (24-char hex)' });
