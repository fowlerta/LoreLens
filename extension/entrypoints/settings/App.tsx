import { useEffect, useMemo, useState } from "react";

import { DictionaryService } from "../../lib/services/DictionaryService";

import { DictionarySettings } from "./components/DictionarySettings";

import type { DictionaryId } from "../../lib/types/dictionary";
import type { DictionarySource } from "../../lib/types/DictionarySource";
import { InstalledDictionaries } from "./components/InstalledDictionaries";
import { ImportSection } from "./components/ImportSection";
import { AboutSection } from "./components/AboutSection";

export default function App(): React.JSX.Element {
  const [dictionaries, setDictionaries] =
    useState<DictionarySource[]>([]);

  const [activeDictionary, setActiveDictionary] =
    useState<DictionaryId | null>(null);

  const dictionaryService = useMemo(
    () => new DictionaryService(),
    [],
  );

  useEffect(() => {
    async function load() {
      await dictionaryService.load();

      setDictionaries(
        dictionaryService.getAvailableDictionaries(),
      );

      setActiveDictionary(
        dictionaryService.getActiveDictionaryId(),
      );
    }

    void load();
  }, [dictionaryService]);

  async function changeDictionary(
    id: DictionaryId,
  ): Promise<void> {
    await dictionaryService.setActiveDictionary(id);

    setActiveDictionary(id);
  }

  return (
    <main className="settings-page">
      <h1>LoreLens Settings</h1>

      <DictionarySettings
        dictionaries={dictionaries}
        active={activeDictionary}
        onChange={(id) => {
          void changeDictionary(id);
        }}
      />

      <InstalledDictionaries
        dictionaries={dictionaries}
      />

      <ImportSection />

      <AboutSection />
    </main>
  );
}