import { vars } from './vars';

const isDev = vars.NODE_ENV === 'development';

export const loggerConfig = isDev
	? {
			level: vars.LOG_LEVEL,
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
					translateTime: 'HH:MM:ss',
					levelFirst: true,
					ignore: 'pid,hostname',
				},
			},
		}
	: {
			level: vars.LOG_LEVEL,
		};
