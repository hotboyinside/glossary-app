export function parseString(name: string, defaultValue?: string): string {
	const value = process.env[name];

	if (value === undefined || value === '') {
		if (defaultValue === undefined) {
			throw new Error(`❌ Missing required env variable: ${name}`);
		}

		return defaultValue;
	}

	return value;
}
