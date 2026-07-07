import { useMemo } from "react";

import { DefinitionRenderer } from "../../../lib/renderers/DefinitionRenderer";
import type { DictionaryEntry } from "../../../lib/types/dictionary";

type DefinitionViewProps = {
  entry: DictionaryEntry | null;
  hasQuery: boolean;

  favorite: boolean;
  onToggleFavorite: () => void;
};

export function DefinitionView({
  entry,
  hasQuery,
  favorite,
  onToggleFavorite,
}: DefinitionViewProps): React.JSX.Element {
  const renderer = useMemo(
    () => new DefinitionRenderer(),
    [],
  );

  if (!entry) {
    return (
      <section className="popup-definition">
        {hasQuery
          ? "No matching definition."
          : "Select a word to view its definition."}
      </section>
    );
  }

  return (
    <section className="popup-definition">
      <div className="popup-definition-header">
        <h2>{entry.word}</h2>

        <button
          type="button"
          className={`popup-favorite-button ${
            favorite ? "favorite" : ""
          }`}
          onClick={onToggleFavorite}
          title={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>
        
      <div
        className="popup-definition-content"
        dangerouslySetInnerHTML={{
          __html: renderer.render(
            entry.definition,
          ),
        }}
      />
    </section>
  );
}