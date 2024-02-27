chrome.runtime.onInstalled.addListener(initializeExtension);
chrome.runtime.onStartup.addListener(initializeExtension);

function initializeExtension() {
  chrome.management.getAll(extensions => {
    const extensionA = extensions.find(extension => extension.name === "GA4 Fixer" && extension.enabled);
    // Set 'ExtensionADisabled' in storage to true if Extension A is found and enabled, false otherwise.
    chrome.storage.sync.set({ 'extensionADisabled': !!extensionA });
  });
}
