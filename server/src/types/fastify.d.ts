import { KeywordsRepository } from '../repositories/keywords';

declare module 'fastify' {
	interface FastifyInstance {
		keywordsRepository: KeywordsRepository;
	}
}
