import { Collection, Db, ObjectId } from 'mongodb';

export interface KeywordSource {
	name?: string;
	url: string;
}

export interface Keyword {
	_id: ObjectId;
	term: string;
	definition: string;
	relatedIds?: ObjectId[];
	sources?: KeywordSource[];
}

export type CreateKeywordDto = Omit<Keyword, '_id'>;

export class KeywordsRepository {
	private collection: Collection<Keyword>;

	constructor(db: Db) {
		this.collection = db.collection<Keyword>('keywords');
	}

	findById(id: string | ObjectId) {
		const objectId = typeof id === 'string' ? new ObjectId(id) : id;
		return this.collection.findOne({ _id: objectId });
	}

	async findRelatedByIds(relatedIds: ObjectId[]) {
		if (relatedIds.length === 0) return [];

		return this.collection
			.find({ _id: { $in: relatedIds } }, { projection: { _id: 1, term: 1 } })
			.toArray();
	}

	findAll(options: { sortByTerm?: boolean; limit?: number; skip?: number }) {
		const query = this.collection.find({}, { projection: { _id: 1, term: 1, definition: 1 } });

		if (options.sortByTerm) {
			query.sort({ term: 1 });
		}

		if (options.skip) {
			query.skip(options.skip);
		}

		if (options.limit) {
			query.limit(options.limit);
		}

		return query.toArray();
	}

	countAll() {
		return this.collection.countDocuments();
	}

	create(dto: CreateKeywordDto) {
		return this.collection.insertOne(dto as Keyword);
	}
}
