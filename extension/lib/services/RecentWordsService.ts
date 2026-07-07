import type { DictionaryEntry } from "../types/dictionary";
import browser from "../browser";

const STORAGE_KEY = "recentWords";
const MAX_RECENT_WORDS = 20;

export class RecentWordsService {
  public async get(): Promise<DictionaryEntry[]> {
    const result = await browser.storage.local.get(
      STORAGE_KEY,
    );

    return (
      (result[STORAGE_KEY] as DictionaryEntry[]) ??
      []
    );
  }

  public async add(
    entry: DictionaryEntry,
  ): Promise<void> {
    const recent = await this.get();

    const updated = [
      entry,
      ...recent.filter(
        (item) => item.word !== entry.word,
      ),
    ].slice(0, MAX_RECENT_WORDS);

    await browser.storage.local.set({
      [STORAGE_KEY]: updated,
    });
  }

  public async clear(): Promise<void> {
    await browser.storage.local.remove(
      STORAGE_KEY,
    );
  }
}