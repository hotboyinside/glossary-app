import {
	FastifyPluginAsyncTypebox,
	Type,
} from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const plugin: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
	const { keywordsRepository } = fastify;

	fastify.get('/keywords', async () => {
		const keywords = await keywordsRepository.findAll({ sortByTerm: true });
		return keywords.map(k => ({
			...k,
			_id: k._id.toHexString(),
		}));
	});

	fastify.get(
		'/keywords/:id/graph',
		{
			schema: {
				params: Type.Object({
					id: Type.String(),
				}),
				response: {
					200: Type.Object({
						keyword: Type.Object({
							id: Type.String(),
							term: Type.String(),
							definition: Type.String(),
							sources: Type.Array(
								Type.Object({
										name: Type.String(),
										url: Type.String(),
								})
							)
						}),
						related: Type.Array(
							Type.Object({
								id: Type.String(),
								term: Type.String(),
							}),
						),
					}),
				},
			},
		},
		async request => {
			const { id } = request.params as { id: string };

			const keyword = await keywordsRepository.findById(id);
			if (!keyword) {
				throw new Error(`Keyword with id ${id} not found`);
			}

			const relatedKeywords = await keywordsRepository.findRelated(id);

			return {
				keyword: {
					id: keyword._id.toHexString(),
					term: keyword.term,
					definition: keyword.definition,
					sources: keyword.sources,
				},
				related: relatedKeywords.map(k => ({
					id: k._id.toHexString(),
					term: k.term,
				})),
			};
		},
	);

	fastify.post(
		'/keywords',
		{
			schema: {
				// body: CreateKeywordDto,
				// response: {
				//   200: Type.Object({
				//     message: Type.String(),
				//     keyword: Type.Object({}) // пока заглушка
				//   }),
				// },
			},
		},
		async request => {
			const newKeywordData = request.body as any; // пока any, пока нет схем
			const newKeyword = await keywordsRepository.create({ ...newKeywordData });

			return {
				message: 'Keyword created',
				keyword: { ...newKeyword },
			};
		},
	);
};

export default fp(plugin);
