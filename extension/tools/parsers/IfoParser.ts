import { readFile } from "node:fs/promises";

import type { StarDictInfo } from "../types/stardict";

export class IfoParser {
  public async parse(path: string): Promise<StarDictInfo> {
    const content = await readFile(path, "utf8");

    const lines = content.split("\n");

    const values = new Map<string, string>();

    for (const line of lines) {
      const separator = line.indexOf("=");

      if (separator === -1) {
        continue;
      }

      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim();

      values.set(key, value);
    }

    return {
      version: values.get("version") ?? "",
      wordCount: Number(values.get("wordcount") ?? 0),
      idxFileSize: Number(values.get("idxfilesize") ?? 0),
      bookName: values.get("bookname") ?? "",
      sameTypeSequence: values.get("sametypesequence") ?? "",
      description: values.get("description"),
    };
  }
}