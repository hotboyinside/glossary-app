export function parseNumber(name: string, defaultValue?: number): number {
	const value = process.env[name];

	if (value === undefined) {
		if (defaultValue === undefined) {
			throw new Error(`❌ Missing required env variable: ${name}`);
		}

		return defaultValue;
	}

	const parsed = Number(value);
	if (Number.isNaN(parsed)) {
		throw new Error(`❌ Env variable ${name} must be a number`);
	}

	return parsed;
}
