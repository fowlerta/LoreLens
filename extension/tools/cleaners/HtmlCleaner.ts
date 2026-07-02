export class HtmlCleaner {
  public clean(html: string): string {
    const text = this.decodeEntities(
      html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/?[a-z]+\s*\d*[^>]*>/gi, "")
        .replace(/\n\s*References[\s\S]*$/i, "")
        .trim(),
    );

    return this.normalizeWhitespace(text);
  }

  private decodeEntities(text: string): string {
    return text
      .replace(/&nbsp;/g, " ")
      .replace(/&mdash;/g, "—")
      .replace(/&bull;/g, "•")
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
        String.fromCodePoint(parseInt(hex, 16)),
      );
  }

  private normalizeWhitespace(text: string): string {
    return text
      .replace(/\r/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\n,\s*$/g, "")
      .trim();
  }
}