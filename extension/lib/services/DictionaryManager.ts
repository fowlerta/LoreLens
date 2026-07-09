import type {
  DictionaryId,
} from "../types/dictionary";

import type {
  DictionarySource,
} from "../types/DictionarySource";

import { SettingsService } from "../services/SettingsService";

export class DictionaryManager {
  private readonly dictionaries =
    new Map<
      DictionaryId,
      DictionarySource
    >();

  private activeDictionaryId: DictionaryId | null =
    null;

  private readonly settingsService =
    new SettingsService();

  public register(
    dictionary: DictionarySource,
  ): void {
    this.dictionaries.set(
      dictionary.id,
      dictionary,
    );

    if (this.activeDictionaryId === null) {
      this.activeDictionaryId =
        dictionary.id;
    }
  }

  public unregister(
    id: DictionaryId,
  ): void {
    this.dictionaries.delete(id);
  }

  public get(
    id: DictionaryId,
  ): DictionarySource | undefined {
    return this.dictionaries.get(id);
  }

  public getAll(): DictionarySource[] {
    return [
      ...this.dictionaries.values(),
    ];
  }

  public has(
    id: DictionaryId,
  ): boolean {
    return this.dictionaries.has(id);
  }

  public getActive():
    | DictionarySource
    | undefined {
    if (this.activeDictionaryId === null) {
      return undefined;
    }
  
    return this.get(
      this.activeDictionaryId,
    );
  }
  
  public async setActive(
    id: DictionaryId,
  ): Promise<void> {
    if (!this.has(id)) {
      throw new Error(
        `Dictionary "${id}" not found.`,
      );
    }
  
    this.activeDictionaryId = id;

    await this.settingsService.setActiveDictionary(
      id,
    );
  }

  public async restore(): Promise<void> {
    const id =
      await this.settingsService.getActiveDictionary();
  
    if (id !== null && this.has(id)) {
      this.activeDictionaryId = id;
    }
  }
  
  public getActiveId():
    | DictionaryId
    | null {
    return this.activeDictionaryId;
  }
}

export const dictionaryManager =
  new DictionaryManager();