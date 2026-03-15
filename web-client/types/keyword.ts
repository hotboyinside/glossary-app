export interface KeywordSource {
  name?: string;
  url: string;
}

export interface KeywordListItem {
  _id: string;
  term: string;
  definition: string;
}

export interface KeywordDetail {
  id: string;
  term: string;
  definition: string;
  sources?: KeywordSource[];
}

export interface KeywordSummary {
  id: string;
  term: string;
}

export interface KeywordGraphData {
  keyword: KeywordDetail;
  related: KeywordSummary[];
}
