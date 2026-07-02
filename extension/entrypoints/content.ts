import { defineContentScript } from "#imports";

import "../assets/tooltip.css";

import { TooltipController } from "../lib/controllers/TooltipController";
import { SelectionObserver } from "../lib/observers/SelectionObserver";
import { WordNormalizer } from "../lib/services/WordNormalizer";

export default defineContentScript({
  matches: ["<all_urls>"],

  main() {
    const observer = new SelectionObserver();
    const controller = new TooltipController();
    const normalizer = new WordNormalizer();

    observer.subscribe((data) => {
      console.log(
        "[LoreLens]",
        data.text,
        "->",
        normalizer.normalize(data.text),
      );

      controller.handle(data);
    });

    observer.start();

    console.log("[LoreLens] initialized.");
  },
});