import { useMemo } from "react";

import { DefinitionRenderer } from "../../../lib/renderers/DefinitionRenderer";
import type { DictionaryEntry } from "../../../lib/types/dictionary";

type DefinitionViewProps = {
  entry: DictionaryEntry | null;
  hasQuery: boolean;
};

export function DefinitionView({
  entry,
  hasQuery,
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
      <h2>{entry.word}</h2>

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