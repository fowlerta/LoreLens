export class WordNormalizer {
  public normalize(text: string): string {
    let normalized = text.trim().toLowerCase();

    normalized = normalized.replace(/^[^\p{L}\p{N}]+/u, "");

    normalized = normalized.replace(/[^\p{L}\p{N}]+$/u, "");

    return normalized;
  }
}