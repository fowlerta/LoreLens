type WordListProps = {
  words: string[];
};

export function WordList({
  words,
}: WordListProps): React.JSX.Element {
  return (
    <aside className="popup-word-list">
      {words.map((word) => (
        <button
          key={word}
          type="button"
        >
          {word}
        </button>
      ))}
    </aside>
  );
}