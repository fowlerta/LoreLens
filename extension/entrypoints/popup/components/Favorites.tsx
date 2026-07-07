import type { DictionaryEntry } from "../../../lib/types/dictionary";

type FavoritesProps = {
  entries: DictionaryEntry[];
  selected: DictionaryEntry | null;
  onSelect: (entry: DictionaryEntry) => void;
};

export function Favorites({
  entries,
  selected,
  onSelect,
}: FavoritesProps): React.JSX.Element {
  if (entries.length === 0) {
    return (
      <aside className="popup-word-list popup-word-list-empty">
        <p>No favorite words yet.</p>

        <small>
          Click ★ next to a word to save it.
        </small>
      </aside>
    );
  }

  return (
    <aside className="popup-word-list">
      {entries.map((entry) => {
        const isActive =
          selected?.word === entry.word;

        return (
          <button
            key={entry.word}
            type="button"
            onClick={() => onSelect(entry)}
            className={`popup-word-item ${
              isActive ? "active" : ""
            }`}
          >
            {entry.word}
          </button>
        );
      })}
    </aside>
  );
}