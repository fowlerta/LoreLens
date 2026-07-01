import { defineContentScript } from "#imports";

import { TooltipController } from "../lib/controllers/TooltipController";
import { SelectionObserver } from "../lib/observers/SelectionObserver";

export default defineContentScript({
  matches: ["<all_urls>"],

  main() {
    const observer = new SelectionObserver();
    const tooltip = new TooltipController();

    observer.subscribe((selection) => {
      console.log("[LoreLens]", selection);

      tooltip.handle(selection);
    });

    observer.start();

    console.log("[LoreLens] initialized.");
  },
});