const APP_INFO = {
  name: "LoreLens",
  tagline: "Offline Reading Companion",
  dictionary: "Tolkien Fictionary",
  entries: 7102,
  version: "0.1.0",
};

export default function App(): React.JSX.Element {
  return (
    <main className="popup">
      <header className="popup-header">
        <h1>{APP_INFO.name}</h1>
        <p>{APP_INFO.tagline}</p>
      </header>

      <section className="popup-card">
        <div className="popup-label">📚 Dictionary</div>
        <div className="popup-value">{APP_INFO.dictionary}</div>
      </section>

      <section className="popup-card">
        <div className="popup-label">📖 Entries</div>
        <div className="popup-value">
          {APP_INFO.entries.toLocaleString()}
        </div>
      </section>

      <section className="popup-card">
        <div className="popup-label">⚙ Version</div>
        <div className="popup-value">{APP_INFO.version}</div>
      </section>
    </main>
  );
}