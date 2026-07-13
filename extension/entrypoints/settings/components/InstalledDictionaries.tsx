import type { DictionarySource } from "../../../lib/types/DictionarySource";

type Props = {
  dictionaries: DictionarySource[];
};

export function InstalledDictionaries({
  dictionaries,
}: Props): React.JSX.Element {
  return (
    <section className="settings-section">
      <h2>Installed Dictionaries</h2>

      {dictionaries.map((dictionary) => (
        <div
          key={dictionary.id}
          className="dictionary-card"
        >
          <strong>{dictionary.name}</strong>

          <p>Offline dictionary</p>

          <small>
            {dictionary.entries.length} entries
          </small>
        </div>
      ))}
    </section>
  );
}