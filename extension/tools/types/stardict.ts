export interface StarDictInfo {
  version: string;
  wordCount: number;
  idxFileSize: number;
  bookName: string;
  sameTypeSequence: string;
  description?: string;
}

export interface StarDictIndexEntry {
  word: string;
  offset: number;
  size: number;
}

export interface DictionaryRecord {
  word: string;
  definition: string;
}