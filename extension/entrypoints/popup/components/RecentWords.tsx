import type { DictionaryEntry } from "../../../lib/types/dictionary";

type RecentWordsProps = {
  entries: DictionaryEntry[];
  selected: DictionaryEntry | null;
  onSelect: (entry: DictionaryEntry) => void;
};

export function RecentWords({
  entries,
  selected,
  onSelect,
}: RecentWordsProps): React.JSX.Element {
  if (entries.length === 0) {
    return (
      <aside className="popup-word-list popup-word-list-empty">
        <p>No recent words yet.</p>

        <small>
          Start reading to build your history.
        </small>
      </aside>
    );
  }

  return (
    <aside className="popup-word-list">
      <h3 className="popup-section-title">
        Recent Words
      </h3>
    
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