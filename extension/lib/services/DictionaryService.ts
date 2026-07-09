import {
  dictionaryManager,
} from "./DictionaryManager";
import dictionary from "../../assets/dictionaries/tolkien.json";

import type { DictionaryEntry } from "../types/dictionary";
import type { DictionaryId } from "../types/dictionary";
import type { DictionarySource } from "../types/DictionarySource";

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

    if (!dictionaryManager.has("tolkien")) {
      dictionaryManager.register({
        id: "tolkien",
        name: "Tolkien Gateway",
        entries: dictionary as DictionaryEntry[],
      });
    }

    await dictionaryManager.restore();

    const source =
      dictionaryManager.getActive();

    if (!source) {
      throw new Error("Dictionary not found.");
    }

    const records = source.entries;

    DictionaryService.entries.clear();
    DictionaryService.normalizedEntries.clear();
    DictionaryService.sortedEntries = [];

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

  public getAvailableDictionaries():
    DictionarySource[] {
    return dictionaryManager.getAll();
  }

  public getActiveDictionaryId():
    DictionaryId | null {
    return dictionaryManager.getActiveId();
  }

  public async setActiveDictionary(
    id: DictionaryId,
  ): Promise<void> {
    await dictionaryManager.setActive(id);

    DictionaryService.entries.clear();
    DictionaryService.normalizedEntries.clear();
    DictionaryService.sortedEntries = [];
    DictionaryService.loaded = false;

    await this.load();
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