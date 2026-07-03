type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBox({
  value,
  onChange,
}: SearchBoxProps): React.JSX.Element {
  return (
    <input
      className="popup-search"
      type="text"
      placeholder="Search dictionary..."
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
    />
  );
}