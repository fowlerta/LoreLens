import dictionary from "../../assets/dictionaries/tolkien.json";

import type { DictionaryEntry } from "../types/dictionary";

export class DictionaryService {
  private static readonly entries = new Map<
    string,
    DictionaryEntry
  >();

  private static readonly normalizedEntries = new Map<
    string,
    DictionaryEntry
  >();

  private static sortedEntries: DictionaryEntry[] = [];

  private static loaded = false;

  public async load(): Promise<void> {
    console.time("DictionaryService.load");
    if (DictionaryService.loaded) {
      console.log("[LoreLens] Using cached dictionary.");
      console.timeEnd("DictionaryService.load");
      return;
    }

    if (DictionaryService.loaded) {
      return;
    }

    const records = dictionary as DictionaryEntry[];

    for (const entry of records) {
      DictionaryService.entries.set(
        entry.word,
        entry,
      );

      DictionaryService.normalizedEntries.set(
        this.normalize(entry.word),
        entry,
      );
    }

    DictionaryService.sortedEntries = [
      ...DictionaryService.entries.values(),
    ].sort((a, b) =>
      a.word.localeCompare(b.word),
    );

    DictionaryService.loaded = true;

    console.timeEnd("DictionaryService.load");
    
    console.log(
      `[LoreLens] Dictionary loaded (${DictionaryService.entries.size} entries).`,
    );

  }

  public lookup(
    word: string,
  ): DictionaryEntry | undefined {
    const entry =
      DictionaryService.entries.get(word) ??
      DictionaryService.normalizedEntries.get(
        this.normalize(word),
      );

    if (!entry) {
      return undefined;
    }

    return this.cleanDefinition(entry);
  }

  public getEntries(): DictionaryEntry[] {
    return DictionaryService.sortedEntries;
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