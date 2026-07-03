export class DefinitionRenderer {
  public render(definition?: string): string {
    if (!definition) {
      return "<p>No definition found.</p>";
    }

    const lines = definition.split("\n");

    const html: string[] = [];

    let inList = false;

    for (const line of lines) {
      const text = line.trim();

      if (!text) {
        if (inList) {
          html.push("</ul>");
          inList = false;
        }

        continue;
      }

      if (text.startsWith("•")) {
        if (!inList) {
          html.push("<ul>");
          inList = true;
        }

        html.push(
          `<li>${text.substring(1).trim()}</li>`,
        );

        continue;
      }

      if (inList) {
        html.push("</ul>");
        inList = false;
      }

      if (/^[A-Z][A-Za-z ]+$/.test(text)) {
        html.push(`<h4>${text}</h4>`);
        continue;
      }

      html.push(`<p>${text}</p>`);
    }

    if (inList) {
      html.push("</ul>");
    }

    return html.join("");
  }
}