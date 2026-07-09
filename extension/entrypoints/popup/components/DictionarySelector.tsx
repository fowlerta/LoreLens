import type { DictionaryId } from "../../../lib/types/dictionary";
import type { DictionarySource } from "../../../lib/types/DictionarySource";

type DictionarySelectorProps = {
  dictionaries: DictionarySource[];
  active: DictionaryId | null;
  onChange: (id: DictionaryId) => void;
};

export function DictionarySelector({
  dictionaries,
  active,
  onChange,
}: DictionarySelectorProps): React.JSX.Element {
  return (
    <select
      value={active ?? ""}
      onChange={(event) =>
        onChange(
          event.target.value as DictionaryId,
        )
      }
    >
      {dictionaries.map((dictionary) => (
        <option
          key={dictionary.id}
          value={dictionary.id}
        >
          {dictionary.name}
        </option>
      ))}
    </select>
  );
}