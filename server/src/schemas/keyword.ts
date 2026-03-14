import { Type } from '@fastify/type-provider-typebox';

export const KeywordSourceSchema = Type.Object({
	name: Type.Optional(Type.String()),
	url: Type.String(),
});

export const KeywordSchema = Type.Object({
	id: Type.String(),
	term: Type.String(),
	definition: Type.String(),
	sources: Type.Array(KeywordSourceSchema),
});

export const KeywordSummarySchema = Type.Pick(KeywordSchema, ['id', 'term']);

export const KeywordListItemSchema = Type.Object({
	_id: Type.String(),
	term: Type.String(),
	definition: Type.String(),
});
