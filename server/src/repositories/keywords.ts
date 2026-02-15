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

	async findRelated(id: string | ObjectId) {
		const objectId = typeof id === 'string' ? new ObjectId(id) : id;
		const keyword = await this.collection.findOne({ _id: objectId });

		if (!keyword) {
			return [];
		}

		if (!keyword.relatedIds || keyword.relatedIds.length === 0) {
			return [];
		}

		const relatedKeywordsCursor = this.collection.find({
			_id: { $in: keyword.relatedIds },
		});

		const relatedKeywords = await relatedKeywordsCursor.toArray();
		return relatedKeywords;
	}

	findAll(options: { sortByTerm?: boolean }) {
		const query = this.collection.find();

		if (options.sortByTerm) {
			query.sort({ term: 1 });
		}

		return query.toArray();
	}

	create(dto: CreateKeywordDto) {
		return this.collection.insertOne(dto as Keyword);
	}
}
