import { writeFile } from "node:fs/promises";

import { DictParser } from "./parsers/DictParser";
import { IdxParser } from "./parsers/IdxParser";
import { HtmlCleaner } from "./cleaners/HtmlCleaner";

async function main() {
  const idxParser = new IdxParser();
  const dictParser = new DictParser();
  const cleaner = new HtmlCleaner();

  const index = await idxParser.parse("./tools/data/tolkien.idx");
  const dict = await dictParser.load("./tools/data/tolkien.dict");

  const records = index.map((entry) => ({
    word: entry.word,
    definition: cleaner.clean(
        dictParser.read(
            dict,
            entry.offset,
            entry.size
        )
    ),
  }));

  console.log(records[0]);
  console.log(records[1]);

  console.log(`Loaded ${records.length} entries.`);

  await writeFile(
    "./assets/dictionaries/tolkien.json",
    JSON.stringify(records, null, 2),
  );

  console.log("Dictionary exported successfully.");
}

main().catch(console.error);