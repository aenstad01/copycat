chrome.storage.onChanged.addListener(function(changes, area) {
  if (area === 'sync' && changes.clickToCopy) {
    // Detect if 'clickToCopy' was added, changed, or removed
    const newValue = changes.clickToCopy.newValue;
    const oldValue = changes.clickToCopy.oldValue;

    console.log(`clickToCopy changed from ${oldValue} to ${newValue}`);

    if (newValue) {
      // If 'clickToCopy' is set and truthy, disable or stop Extension B functionality
      console.log("clickToCopy is enabled. Extension B functionality will be disabled.");
    } else {
      // If 'clickToCopy' is falsey, enable or proceed with Extension B functionality
      console.log("clickToCopy is disabled or removed. Extension B functionality can proceed.");
      // Call your main function or enable functionality here
      mainFunction(); // Ensure to replace mainFunction with your actual function name
    }
  }
});
