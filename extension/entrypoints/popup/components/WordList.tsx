import type { DictionaryEntry } from "../../../lib/types/dictionary";
import { useEffect, useRef } from "react";

type WordListProps = {
  entries: DictionaryEntry[];
  selected: DictionaryEntry | null;
  onSelect: (entry: DictionaryEntry) => void;
};

export function WordList({
  entries,
  selected,
  onSelect,
}: WordListProps): React.JSX.Element {
  const activeRef =
    useRef<HTMLButtonElement | null>(null);
        
  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [selected]);

  if (entries.length === 0) {
    return (
      <aside className="popup-word-list popup-word-list-empty">
        No results found.
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
            ref={isActive ? activeRef : null}
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