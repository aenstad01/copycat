console.log("copycat loaded");
function mainContentScriptFunction() {
  // Variable to store the previously copied element
  var prevCopiedElement = null;

  // Variable to store the current tooltip
  var currentTooltip = null;

  // Function to show a tooltip
  function showTooltip(element, message) {
    // Remove the existing tooltip if there is one.
    if (currentTooltip) {
      document.body.removeChild(currentTooltip);
      currentTooltip = null;
    }

    // Styling the tooltip
    var tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'black';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    tooltip.textContent = message;

    // Positioning the tooltip
    var rect = element.getBoundingClientRect();
    tooltip.style.top = (rect.top + window.scrollY - 30) + 'px';
    tooltip.style.left = (rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

    // Append and auto-remove the tooltip
    document.body.appendChild(tooltip);
    currentTooltip = tooltip;
    setTimeout(function() {
      if (currentTooltip === tooltip) {
        document.body.removeChild(tooltip);
        currentTooltip = null;
      }
    }, 2000); 
  }

  document.addEventListener('click', function(event) {
    // Your existing event listener logic
  });
}

// The conditional check should be placed outside the mainContentScriptFunction
chrome.storage.sync.get(['extensionADisabled'], function(result) {
  // If 'extensionADisabled' is not set, default to false (meaning Extension B is enabled by default)
  if (!(result.extensionADisabled === true)) {
    mainContentScriptFunction();
  } else {
    console.log("Extension A is active. Extension B's content script will not execute.");
  }
});

