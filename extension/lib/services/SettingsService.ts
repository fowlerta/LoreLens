import browser from "../browser";

import type { DictionaryId } from "../types/dictionary";

const STORAGE_KEY = "settings";

type Settings = {
  activeDictionary: DictionaryId;
};

export class SettingsService {
  public async get(): Promise<Settings> {
    const result =
      await browser.storage.local.get(
        STORAGE_KEY,
      );

    return (
      (result[STORAGE_KEY] as Settings) ?? {
        activeDictionary: "tolkien",
      }
    );
  }

  public async setActiveDictionary(
    id: DictionaryId,
  ): Promise<void> {
    const settings = await this.get();

    settings.activeDictionary = id;

    await browser.storage.local.set({
      [STORAGE_KEY]: settings,
    });
  }

  public async getActiveDictionary(): Promise<DictionaryId> {
    const settings = await this.get();

    return settings.activeDictionary;
  }
}