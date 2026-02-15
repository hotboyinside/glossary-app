import 'dotenv/config';
import { envHelpers } from '../utils/parsers';

export const vars = {
	FRONTEND_URL: envHelpers.parseString('FRONTEND_URL', 'http://localhost:3000'),
	NODE_ENV: envHelpers.parseString('NODE_ENV', 'development'),
	LOG_LEVEL: envHelpers.parseString('LOG_LEVEL', 'debug'),
	PORT: envHelpers.parseNumber('PORT', 5000),
	MONGO_URL: envHelpers.parseRequired('MONGO_URL'),
} as const;
