import type { DictionaryEntry } from "../../../lib/types/dictionary";

type DefinitionViewProps = {
  entry: DictionaryEntry | null;
};

export function DefinitionView({
  entry,
}: DefinitionViewProps): React.JSX.Element {
  if (!entry) {
    return (
      <section className="popup-definition">
        Select a word
      </section>
    );
  }

  return (
    <section className="popup-definition">
      <h2>{entry.word}</h2>
      <p>{entry.definition}</p>
    </section>
  );
}