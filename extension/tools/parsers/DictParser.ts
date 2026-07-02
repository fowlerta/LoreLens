import { readFile } from "node:fs/promises";

export class DictParser {
  public async load(path: string): Promise<Buffer> {
    return readFile(path);
  }

  public read(
    buffer: Buffer,
    offset: number,
    size: number,
  ): string {
    return buffer.toString(
      "utf8",
      offset,
      offset + size,
    );
  }
}