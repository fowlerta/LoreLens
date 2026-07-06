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

  const filteredEntries = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return entries;
    }

    return entries.filter((entry) =>
      entry.word.toLowerCase().includes(value),
    );
  }, [entries, query]);

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
    }

    void loadDictionary();
  }, [dictionaryService]);

  useEffect(() => {
    if (filteredEntries.length === 0) {
      setSelectedEntry(null);
      return;
    }

    const stillExists = filteredEntries.some(
      (entry) => entry.word === selectedEntry?.word,
    );

    if (!stillExists && query.trim()) {
      setSelectedEntry(filteredEntries[0]);
    }
  }, [filteredEntries, selectedEntry, query]);

  useEffect(() => {
    console.time("Popup initialization");
    
    async function loadDictionary() {
      console.time("Dictionary load");
    
      await dictionaryService.load();
    
      console.timeEnd("Dictionary load");
    
      const entries = dictionaryService.getEntries();
    
      setEntries(entries);
    
      console.timeEnd("Popup initialization");
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
          entries={filteredEntries}
          selected={selectedEntry}
          onSelect={setSelectedEntry}
        />

        <DefinitionView 
          entry={selectedEntry}
          hasQuery={query.trim().length > 0}
        />
      </div>
    </main>
  );
}