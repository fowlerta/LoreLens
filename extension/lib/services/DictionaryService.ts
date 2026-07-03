import dictionary from "../../assets/dictionaries/tolkien.json";

import type { DictionaryEntry } from "../types/dictionary";

export class DictionaryService {
  private readonly entries = new Map<string, DictionaryEntry>();

  public async load(): Promise<void> {
    const records = dictionary as DictionaryEntry[];

    this.entries.clear();

    for (const entry of records) {
      this.entries.set(
        entry.word.toLowerCase(),
        entry,
      );
    }

    console.log(
      `[LoreLens] Loaded ${this.entries.size} dictionary entries.`,
    );
  }

  public lookup(word: string): DictionaryEntry | undefined {
    return this.entries.get(word.toLowerCase());
  }
}