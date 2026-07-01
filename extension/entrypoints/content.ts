import { defineContentScript } from "#imports";

import { SelectionObserver } from "../lib/observers/SelectionObserver";

export default defineContentScript({
  matches: ["<all_urls>"],

  main() {
    const observer = new SelectionObserver();

    observer.subscribe((data) => {
      console.log("[LoreLens]", data);
    });

    observer.start();

    console.log("[LoreLens] initialized.");
  },
});