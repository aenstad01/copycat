console.log("background.js loaded");

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync' && changes.clickToCopy) {
        // Access the new value of clickToCopy
        const newValue = changes.clickToCopy.newValue;

        if (newValue) {
            console.log("clickToCopy is now enabled. Extension B should not run.");
            // Code to disable or stop Extension B's functionality
        } else {
            console.log("clickToCopy is not enabled. Extension B can run.");
            // Code to enable or proceed with Extension B's functionality
            mainContentScriptFunction(); // Ensure this function is defined and implements your main script logic
        }
    }
});
