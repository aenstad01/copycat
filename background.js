chrome.runtime.onInstalled.addListener(() => {
  checkAndDisableIfExtensionAExists();
});

chrome.runtime.onStartup.addListener(() => {
  checkAndDisableIfExtensionAExists();
});

function checkAndDisableIfExtensionAExists() {
  chrome.management.getAll(extensions => {
    const extensionA = extensions.find(extension => extension.name === "Your Extension A Name" && extension.enabled);
    if (extensionA) {
      console.log("Extension A is enabled. Disabling Extension B.");
      // Optionally, disable Extension B functionality here
      // For example, set a global flag to prevent running core functionality
    }
  });
}
