type Tab =
  | "dictionary"
  | "recent"
  | "favorites";

type TabsProps = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

export function Tabs({
  active,
  onChange,
}: TabsProps): React.JSX.Element {
  return (
    <nav className="popup-tabs">
      <button
        type="button"
        className={`popup-tab ${
          active === "dictionary"
            ? "active"
            : ""
        }`}
        onClick={() =>
          onChange("dictionary")
        }
      >
        Dictionary
      </button>

      <button
        type="button"
        className={`popup-tab ${
          active === "recent"
            ? "active"
            : ""
        }`}
        onClick={() =>
          onChange("recent")
        }
      >
        Recent
      </button>
    </nav>
  );
}