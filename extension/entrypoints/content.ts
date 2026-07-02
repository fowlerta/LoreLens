import { defineContentScript } from "#imports";

import "../assets/tooltip.css";

import { TooltipController } from "../lib/controllers/TooltipController";
import { SelectionObserver } from "../lib/observers/SelectionObserver";
import { WordNormalizer } from "../lib/services/WordNormalizer";
import { DictionaryService } from "../lib/services/DictionaryService";

export default defineContentScript({
  matches: ["<all_urls>"],

  main: async () => {
    const observer = new SelectionObserver();
    const controller = new TooltipController();
    const normalizer = new WordNormalizer();
    const dictionary = new DictionaryService();

    await dictionary.load();

    observer.subscribe((data) => {
      const normalized = normalizer.normalize(data.text);

      const entry = dictionary.lookup(normalized);

      console.log("[LoreLens]", normalized, entry);

      controller.handle(data);
    });

    observer.start();

    console.log("[LoreLens] initialized.");
  },
});