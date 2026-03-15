import 'dotenv/config';
import { join } from 'path';

const config = {
	mongodb: {
		url: process.env.MONGO_URL,
		options: {},
	},
	migrationsDir: join(__dirname, '..', 'migrations'),
	changelogCollectionName: 'changelog',
	lockCollectionName: 'changelog_lock',
	lockTtl: 0,
	migrationFileExtension: __filename.endsWith('.ts') ? '.ts' : '.js',
	useFileHash: false,
	moduleSystem: 'commonjs',
};

export default config;
