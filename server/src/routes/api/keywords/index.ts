import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import fp from 'fastify-plugin';
import {
	KeywordListItemSchema,
	KeywordSchema,
	KeywordSummarySchema,
} from '../../../schemas/keyword';
import { MongoId } from '../../../schemas/common';
import { DataResponse, ErrorResponse } from '../../../schemas/response';
import { dataResponse } from '../../../utils/response';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
	const { keywordsRepository } = fastify;

	fastify.get(
		'/keywords',
		{
			schema: {
				summary: 'List all keywords',
				tags: ['keywords'],
				response: {
					200: DataResponse(Type.Array(KeywordListItemSchema)),
				},
			},
		},
		async () => {
			const keywords = await keywordsRepository.findAll({ sortByTerm: true });
			return dataResponse(
				keywords.map((k) => ({
					_id: k._id.toHexString(),
					term: k.term,
					definition: k.definition,
				})),
			);
		},
	);

	fastify.get(
		'/keywords/:id/graph',
		{
			schema: {
				summary: 'Get a keyword with its related keywords',
				tags: ['keywords'],
				params: Type.Object({
					id: MongoId(),
				}),
				response: {
					200: DataResponse(
						Type.Object({
							keyword: KeywordSchema,
							related: Type.Array(KeywordSummarySchema),
						}),
					),
					404: ErrorResponse,
				},
			},
		},
		async (request) => {
			const { id } = request.params;

			const keyword = await keywordsRepository.findById(id);
			if (!keyword) {
				throw Object.assign(new Error(`Keyword with id ${id} not found`), {
					statusCode: 404,
					code: 'NOT_FOUND',
				});
			}

			const relatedKeywords = await keywordsRepository.findRelated(id);

			return dataResponse({
				keyword: {
					id: keyword._id.toHexString(),
					term: keyword.term,
					definition: keyword.definition,
					sources: keyword.sources ?? [],
				},
				related: relatedKeywords.map((k) => ({
					id: k._id.toHexString(),
					term: k.term,
				})),
			});
		},
	);
};

export default fp(plugin);
