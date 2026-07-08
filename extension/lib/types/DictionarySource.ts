import type {
  DictionaryEntry,
  DictionaryId,
} from "./dictionary";

export interface DictionarySource {
  id: DictionaryId;
  name: string;
  entries: DictionaryEntry[];
}