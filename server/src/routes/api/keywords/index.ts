import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import {
	KeywordListItemSchema,
	KeywordSchema,
	KeywordSummarySchema,
} from '../../../schemas/keyword';
import { MongoId } from '../../../schemas/common';
import { DataResponse, ErrorResponse, PaginatedResponse } from '../../../schemas/response';
import { dataResponse } from '../../../utils/response';
import { Pagination } from '../../../constants/pagination';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
	const { keywordsRepository } = fastify;

	fastify.get(
		'/',
		{
			schema: {
				summary: 'List all keywords',
				tags: ['keywords'],
				querystring: Type.Object({
					page: Type.Optional(Type.Number({ minimum: 1, default: Pagination.DEFAULT_PAGE })),
					limit: Type.Optional(
						Type.Number({
							minimum: 1,
							maximum: Pagination.MAX_LIMIT,
							default: Pagination.DEFAULT_LIMIT,
						}),
					),
				}),
				response: {
					200: PaginatedResponse(KeywordListItemSchema),
				},
			},
		},
		async (request) => {
			const page = request.query.page ?? Pagination.DEFAULT_PAGE;
			const limit = request.query.limit ?? Pagination.DEFAULT_LIMIT;
			const skip = (page - 1) * limit;

			const [keywords, total] = await Promise.all([
				keywordsRepository.findAll({ sortByTerm: true, limit, skip }),
				keywordsRepository.countAll(),
			]);

			return {
				data: keywords.map((k) => ({
					_id: k._id.toHexString(),
					term: k.term,
					definition: k.definition,
				})),
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		},
	);

	fastify.get(
		'/:id/graph',
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

			const relatedKeywords = await keywordsRepository.findRelatedByIds(keyword.relatedIds ?? []);

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

export default plugin;
