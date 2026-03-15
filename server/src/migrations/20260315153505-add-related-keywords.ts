import { Db } from 'mongodb';

interface KeywordSeed {
	term: string;
	definition: string;
	sources?: Array<{ name?: string; url: string }>;
	relatedTerms: string[];
}

/**
 * Seed data — add your keywords here.
 * `relatedTerms` references other keywords by term name (case-insensitive).
 */
const KEYWORDS: KeywordSeed[] = [
	{
		term: 'JavaScript',
		definition:
			'A high-level, dynamic programming language primarily used for building interactive web applications. It runs in browsers and on servers via Node.js.',
		sources: [{ name: 'MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }],
		relatedTerms: ['TypeScript', 'Node.js', 'React', 'HTML', 'CSS'],
	},
	{
		term: 'TypeScript',
		definition:
			'A strongly typed superset of JavaScript that compiles to plain JavaScript. It adds static type checking and modern language features.',
		sources: [{ name: 'Official site', url: 'https://www.typescriptlang.org' }],
		relatedTerms: ['JavaScript', 'Node.js', 'React'],
	},
	{
		term: 'Node.js',
		definition:
			"A JavaScript runtime built on Chrome's V8 engine that allows running JavaScript on the server side.",
		sources: [{ name: 'Official site', url: 'https://nodejs.org' }],
		relatedTerms: ['JavaScript', 'TypeScript', 'Express', 'npm'],
	},
	{
		term: 'React',
		definition:
			'A JavaScript library for building user interfaces using a component-based architecture and a virtual DOM.',
		sources: [{ name: 'Official site', url: 'https://react.dev' }],
		relatedTerms: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Next.js'],
	},
	{
		term: 'Next.js',
		definition:
			'A React framework that provides server-side rendering, static site generation, and other production-ready features out of the box.',
		sources: [{ name: 'Official site', url: 'https://nextjs.org' }],
		relatedTerms: ['React', 'JavaScript', 'TypeScript'],
	},
	{
		term: 'HTML',
		definition:
			'HyperText Markup Language — the standard markup language for creating web pages and web applications.',
		sources: [{ name: 'MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }],
		relatedTerms: ['CSS', 'JavaScript', 'DOM', 'React'],
	},
	{
		term: 'CSS',
		definition:
			'Cascading Style Sheets — a stylesheet language used to describe the presentation and layout of HTML documents.',
		sources: [{ name: 'MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }],
		relatedTerms: ['HTML', 'JavaScript', 'React'],
	},
	{
		term: 'REST API',
		definition:
			'Representational State Transfer — an architectural style for designing networked applications using stateless HTTP requests.',
		sources: [{ name: 'MDN', url: 'https://developer.mozilla.org/en-US/docs/Glossary/REST' }],
		relatedTerms: ['HTTP', 'JSON', 'Express'],
	},
	{
		term: 'HTTP',
		definition:
			'HyperText Transfer Protocol — the foundation of data communication on the web, defining how messages are formatted and transmitted.',
		sources: [{ name: 'MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' }],
		relatedTerms: ['REST API', 'JSON', 'HTML'],
	},
	{
		term: 'JSON',
		definition:
			'JavaScript Object Notation — a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse.',
		sources: [{ name: 'Official site', url: 'https://www.json.org' }],
		relatedTerms: ['JavaScript', 'REST API', 'HTTP'],
	},
	{
		term: 'DOM',
		definition:
			'Document Object Model — a programming interface for web documents that represents the page as a tree of nodes that can be manipulated with JavaScript.',
		sources: [
			{
				name: 'MDN',
				url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model',
			},
		],
		relatedTerms: ['HTML', 'JavaScript', 'React', 'CSS'],
	},
	{
		term: 'npm',
		definition:
			'Node Package Manager — the default package manager for Node.js, used to install, share, and manage JavaScript dependencies.',
		sources: [{ name: 'Official site', url: 'https://www.npmjs.com' }],
		relatedTerms: ['Node.js', 'JavaScript'],
	},
	{
		term: 'Express',
		definition:
			'A minimal and flexible Node.js web application framework that provides a set of features for building web and API servers.',
		sources: [{ name: 'Official site', url: 'https://expressjs.com' }],
		relatedTerms: ['Node.js', 'REST API', 'HTTP', 'JavaScript'],
	},
	{
		term: 'MongoDB',
		definition:
			'A document-oriented NoSQL database that stores data in flexible, JSON-like documents instead of traditional table-based rows.',
		sources: [{ name: 'Official site', url: 'https://www.mongodb.com' }],
		relatedTerms: ['JSON', 'Node.js', 'REST API'],
	},
	{
		term: 'Git',
		definition:
			'A distributed version control system for tracking changes in source code during software development.',
		sources: [{ name: 'Official site', url: 'https://git-scm.com' }],
		relatedTerms: ['GitHub'],
	},
	{
		term: 'GitHub',
		definition:
			'A cloud-based platform for hosting Git repositories, enabling collaboration, code review, and CI/CD workflows.',
		sources: [{ name: 'Official site', url: 'https://github.com' }],
		relatedTerms: ['Git'],
	},
	{
		term: 'Docker',
		definition:
			'A platform for building, shipping, and running applications in isolated containers that package code with all its dependencies.',
		sources: [{ name: 'Official site', url: 'https://www.docker.com' }],
		relatedTerms: ['Node.js', 'MongoDB'],
	},
];

export = {
	async up(db: Db) {
		const collection = db.collection('keywords');

		const count = await collection.countDocuments();
		if (count > 0) {
			console.log(
				`  [SKIP] keywords collection already has ${count} documents — no seeding needed`,
			);
			return;
		}

		if (KEYWORDS.length === 0) {
			console.log('  [SKIP] No seed data defined in KEYWORDS array');
			return;
		}

		// Step 1: Insert all keywords without relatedIds
		const docs = KEYWORDS.map(({ relatedTerms: _relatedTerms, ...rest }) => rest);
		const result = await collection.insertMany(docs);
		console.log(`  [OK] Inserted ${result.insertedCount} keywords`);

		// Step 2: Build term -> _id lookup and update relatedIds
		const allKeywords = await collection.find({}, { projection: { _id: 1, term: 1 } }).toArray();
		const termToId = new Map(
			allKeywords.map((kw) => [(kw['term'] as string).toLowerCase(), kw._id]),
		);

		let linked = 0;
		for (const seed of KEYWORDS) {
			if (seed.relatedTerms.length === 0) continue;

			const sourceId = termToId.get(seed.term.toLowerCase());
			if (!sourceId) continue;

			const relatedIds = seed.relatedTerms
				.map((t) => termToId.get(t.toLowerCase()))
				.filter(Boolean);

			if (relatedIds.length > 0) {
				await collection.updateOne({ _id: sourceId }, { $set: { relatedIds } });
				linked++;
			}
		}

		console.log(`  [OK] Linked related keywords for ${linked} entries`);
	},

	async down(db: Db) {
		const collection = db.collection('keywords');

		// Only remove seeded keywords (by matching term names)
		const terms = KEYWORDS.map((k) => k.term);
		if (terms.length > 0) {
			const result = await collection.deleteMany({ term: { $in: terms } });
			console.log(`  [OK] Removed ${result.deletedCount} seeded keywords`);
		}
	},
};
