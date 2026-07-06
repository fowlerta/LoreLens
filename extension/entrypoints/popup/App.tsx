import { useEffect, useMemo, useState } from "react";

import { DictionaryService } from "../../lib/services/DictionaryService";

import { DefinitionView } from "./components/DefinitionView";
import { SearchBox } from "./components/SearchBox";
import { WordList } from "./components/WordList";
import type { DictionaryEntry } from "../../lib/types/dictionary";

const APP_INFO = {
  name: "LoreLens",
  tagline: "Offline Reading Companion",
};

export default function App(): React.JSX.Element {
  const [query, setQuery] = useState("");

  const [entries, setEntries] = useState<
    DictionaryEntry[]
  >([]);

  const [selectedEntry, setSelectedEntry] =
    useState<DictionaryEntry | null>(null);

  const dictionaryService = useMemo(
    () => new DictionaryService(),
    [],
  );

  useEffect(() => {
    async function loadDictionary() {
      await dictionaryService.load();

      const entries =
        dictionaryService.getEntries();

      setEntries(entries);

      if (entries.length > 0) {
        setSelectedEntry(entries[0]);
      }
    }

    void loadDictionary();
  }, [dictionaryService]);

  return (
    <main className="popup">
      <header className="popup-header">
        <h1>{APP_INFO.name}</h1>
        <p>{APP_INFO.tagline}</p>
      </header>

      <SearchBox
        value={query}
        onChange={setQuery}
      />

      <div className="popup-content">
        <WordList 
          entries={entries}
          selected={selectedEntry}
          onSelect={setSelectedEntry}
        />

        <DefinitionView entry={selectedEntry} />
      </div>
    </main>
  );
}