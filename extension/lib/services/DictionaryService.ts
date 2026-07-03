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
    const entry =
      this.entries.get(word) ??
      this.normalizedEntries.get(
        this.normalize(word),
      );

    if (!entry) {
      return undefined;
    }

    return this.cleanDefinition(entry);
  }

  private cleanDefinition(
    entry: DictionaryEntry,
  ): DictionaryEntry {
    return {
      ...entry,
      definition: entry.definition.replace(
        /^Redirected to entry:\s*.+\n+/m,
        "",
      ),
    };
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