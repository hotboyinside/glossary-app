import { TSchema, Type } from '@fastify/type-provider-typebox';

export const DataResponse = <T extends TSchema>(schema: T) => Type.Object({ data: schema });

export const PaginationSchema = Type.Object({
	page: Type.Number(),
	limit: Type.Number(),
	total: Type.Number(),
	totalPages: Type.Number(),
});

export const PaginatedResponse = <T extends TSchema>(schema: T) =>
	Type.Object({
		data: Type.Array(schema),
		pagination: PaginationSchema,
	});

export const ErrorResponse = Type.Object({
	error: Type.Object({
		message: Type.String(),
		code: Type.Optional(Type.String()),
	}),
});
