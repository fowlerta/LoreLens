import browser from "webextension-polyfill";

export default defineBackground(() => {
  console.log("Hello background!", {
    id: browser.runtime.id,
  });

  browser.runtime.onMessage.addListener(
    async (message) => {
      if (message.type !== "open-settings") {
        return;
      }

      await browser.tabs.create({
        url: browser.runtime.getURL("settings.html"),
      });
    },
  );
});