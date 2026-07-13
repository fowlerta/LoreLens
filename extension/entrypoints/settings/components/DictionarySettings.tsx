import type {
  DictionaryId,
} from "../../../lib/types/dictionary";

import type {
  DictionarySource,
} from "../../../lib/types/DictionarySource";

type Props = {
  dictionaries: DictionarySource[];
  active: DictionaryId | null;
  onChange: (id: DictionaryId) => void;
};

export function DictionarySettings({
  dictionaries,
  active,
  onChange,
}: Props): React.JSX.Element {
  return (
    <section className="settings-section">
      <h2>Default Dictionary</h2>

      {dictionaries.map((dictionary) => (
        <label
          key={dictionary.id}
          className="dictionary-option"
        >
          <input
            type="radio"
            name="dictionary"
            checked={dictionary.id === active}
            onChange={() =>
              onChange(dictionary.id)
            }
          />

          <span>{dictionary.name}</span>
        </label>
      ))}
    </section>
  );
}