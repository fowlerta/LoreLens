import browser from "../browser";
import type { DictionaryEntry } from "../types/dictionary";

const STORAGE_KEY = "favoriteWords";

export class FavoritesService {
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
    const favorites = await this.get();

    const updated = [
      entry,
      ...favorites.filter(
        (item) => item.word !== entry.word,
      ),
    ];

    await browser.storage.local.set({
      [STORAGE_KEY]: updated,
    });
  }

  public async remove(
    word: string,
  ): Promise<void> {
    const favorites = await this.get();

    await browser.storage.local.set({
      [STORAGE_KEY]: favorites.filter(
        (item) => item.word !== word,
      ),
    });
  }

  public async isFavorite(
    word: string,
  ): Promise<boolean> {
    const favorites = await this.get();

    return favorites.some(
      (item) => item.word === word,
    );
  }

  public async toggle(
    entry: DictionaryEntry,
  ): Promise<boolean> {
    const favorite =
      await this.isFavorite(entry.word);

    if (favorite) {
      await this.remove(entry.word);

      return false;
    }

    await this.add(entry);

    return true;
  }
}