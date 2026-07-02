import { readFile } from "node:fs/promises";

import type { StarDictIndexEntry } from "../types/stardict";

export class IdxParser {
  public async parse(path: string): Promise<StarDictIndexEntry[]> {
    const buffer = await readFile(path);

    const entries: StarDictIndexEntry[] = [];

    let offset = 0;

    while (offset < buffer.length) {
      const end = buffer.indexOf(0, offset);

      const word = buffer.toString("utf8", offset, end);

      offset = end + 1;

      const definitionOffset = buffer.readUInt32BE(offset);
      offset += 4;

      const definitionSize = buffer.readUInt32BE(offset);
      offset += 4;

      entries.push({
        word,
        offset: definitionOffset,
        size: definitionSize,
      });
    }

    return entries;
  }
}