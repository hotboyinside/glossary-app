import { TSchema, Type } from '@fastify/type-provider-typebox';

export const DataResponse = <T extends TSchema>(schema: T) => Type.Object({ data: schema });

export const ErrorResponse = Type.Object({
	error: Type.Object({
		message: Type.String(),
		code: Type.Optional(Type.String()),
	}),
});
