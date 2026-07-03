import { useState } from "react";

import { SearchBox } from "./components/SearchBox";
import { WordList } from "./components/WordList";
import { DefinitionView } from "./components/DefinitionView";

const APP_INFO = {
  name: "LoreLens",
  tagline: "Offline Reading Companion",
};

export default function App(): React.JSX.Element {
  const [query, setQuery] = useState("");

  return (
    <main className="popup">
      <header className="popup-header">
        <h1>{APP_INFO.name}</h1>
        <p>{APP_INFO.tagline}</p>
      </header>

      <SearchBox
        value={query}
        onChange={setQuery}
      />

      <div className="popup-content">
        <WordList />

        <DefinitionView />
      </div>
    </main>
  );
}