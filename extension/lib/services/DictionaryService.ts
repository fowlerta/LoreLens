import dictionary from "../../assets/dictionaries/tolkien.json";

import type { DictionaryEntry } from "../types/dictionary";

export class DictionaryService {
  private readonly entries = new Map<string, DictionaryEntry>();

  private readonly normalizedEntries = new Map<
    string,
    DictionaryEntry
  >();

  public async load(): Promise<void> {
    const records = dictionary as DictionaryEntry[];

    this.entries.clear();
    this.normalizedEntries.clear();

    for (const entry of records) {
      this.entries.set(entry.word, entry);

      this.normalizedEntries.set(
        this.normalize(entry.word),
        entry,
      );
    }

    console.log(
      `[LoreLens] Loaded ${this.entries.size} dictionary entries.`,
    );
  }

  public lookup(word: string): DictionaryEntry | undefined {
    const exact = this.entries.get(word);

    if (exact) {
      return exact;
    }

    return this.normalizedEntries.get(
      this.normalize(word),
    );
  }

  private normalize(word: string): string {
    return word
      .toLowerCase()
      .replace(/^\(\s*[a-z]\s*\)\s*/i, "")
      .replace(/^[^\p{L}\p{N}]+/gu, "")
      .replace(/[^\p{L}\p{N}]+$/gu, "")
      .replace(/['’]s$/u, "")
      .trim();
  }
}