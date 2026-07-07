import { useEffect, useMemo, useState } from "react";

import { DictionaryService } from "../../lib/services/DictionaryService";

import { DefinitionView } from "./components/DefinitionView";
import { SearchBox } from "./components/SearchBox";
import { WordList } from "./components/WordList";
import type { DictionaryEntry } from "../../lib/types/dictionary";
import { RecentWordsService } from "../../lib/services/RecentWordsService";
import { RecentWords } from "./components/RecentWords";
import { Tabs } from "./components/Tabs";
import { FavoritesService } from "../../lib/services/FavoritesService";
import { Favorites } from "./components/Favorites";

type Tab =
  | "dictionary"
  | "recent"
  | "favorites";

const APP_INFO = {
  name: "LoreLens",
  tagline: "Offline Reading Companion",
};

export default function App(): React.JSX.Element {
  const [query, setQuery] = useState("");

  const [entries, setEntries] = useState<
    DictionaryEntry[]
  >([]);

  const [recentEntries, setRecentEntries] =
    useState<DictionaryEntry[]>([]);

  const [favoriteEntries, setFavoriteEntries] =
    useState<DictionaryEntry[]>([]);


  const [activeTab, setActiveTab] =
    useState<Tab>("dictionary");

  const [selectedEntries, setSelectedEntries] =
    useState<
      Record<Tab, DictionaryEntry | null>
    >({
      dictionary: null,
      recent: null,
      favorites: null,
    });

  const selectedEntry =
    selectedEntries[activeTab];

  const isFavorite =
    selectedEntry !== null &&
    favoriteEntries.some(
      (entry) =>
        entry.word === selectedEntry.word,
    );

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

  const recentWordsService = useMemo(
    () => new RecentWordsService(),
    [],
  );

  const favoritesService = useMemo(
    () => new FavoritesService(),
    [],
  );

  function selectEntry(
    tab: Tab,
    entry: DictionaryEntry,
  ): void {
    setSelectedEntries((previous) => ({
      ...previous,
      [tab]: entry,
    }));
  }

  async function toggleFavorite(
    entry: DictionaryEntry,
  ): Promise<void> {
    await favoritesService.toggle(entry);

    const favorites =
      await favoritesService.get();

    setFavoriteEntries(favorites);
  }

  useEffect(() => {
    async function loadDictionary() {
      await dictionaryService.load();

      const entries =
        dictionaryService.getEntries();

      setEntries(entries);

      const recent =
        await recentWordsService.get();

      setRecentEntries(recent);

      const favorites =
        await favoritesService.get();

      setFavoriteEntries(favorites);
    }

    void loadDictionary();
  }, [dictionaryService, recentWordsService, favoritesService]);

  useEffect(() => {
    if (filteredEntries.length === 0) {
      setSelectedEntries((previous) => ({
        ...previous,
        dictionary: null,
      }));

      return;
    }

    const stillExists = filteredEntries.some(
      (entry) => 
        entry.word === 
        selectedEntries.dictionary?.word,
    );

    if (!stillExists && query.trim()) {
      setSelectedEntries((previous) => ({
        ...previous,
        dictionary: filteredEntries[0],
      }));
    }
  }, [filteredEntries, selectedEntries.dictionary, query]);

  useEffect(() => {
    if (activeTab !== "dictionary") {
      setQuery("");
    }
  }, [activeTab]);

  return (
    <main className="popup">
      <header className="popup-header">
        <h1>{APP_INFO.name}</h1>
        <p>{APP_INFO.tagline}</p>
      </header>

      {activeTab === "dictionary" && (
        <SearchBox
          value={query}
          onChange={setQuery}
        />
      )}

      <Tabs
        active={activeTab}
        onChange={setActiveTab}
      />

      <div className="popup-content">
        {activeTab === "dictionary" && (
          <WordList
            entries={filteredEntries}
            selected={selectedEntries.dictionary}
            onSelect={(entry) =>
              selectEntry("dictionary", entry)
            }
          />
        )}

        {activeTab === "recent" && (
          <RecentWords
            entries={recentEntries}
            selected={selectedEntries.recent}
            onSelect={(entry) =>
              selectEntry("recent", entry)
            }
          />
        )}

        {activeTab === "favorites" && (
          <Favorites
            entries={favoriteEntries}
            selected={selectedEntries.favorites}
            onSelect={(entry) =>
              selectEntry("favorites", entry)
            }
          />
        )}

        <DefinitionView
          entry={selectedEntry}
          hasQuery={query.trim().length > 0}
          favorite={isFavorite}
          onToggleFavorite={() => {
            if (selectedEntry) {
              void toggleFavorite(selectedEntry);
            }
          }}
        />
      </div>
    </main>
  );
}