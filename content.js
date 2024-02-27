console.log("copycat loaded");

chrome.storage.sync.get(['clickToCopy'], function(result) {
    if (result.clickToCopy) {
        console.log("clickToCopy is enabled. Extension B will not run.");
    } else {
        // Your Extension B's main script or initialization code here
        console.log("clickToCopy is not enabled or not set. Extension B can run.");
        mainContentScriptFunction(); // Replace mainFunction with the actual function that starts your extension's logic
    }
});


function mainContentScriptFunction() {
  console.log("main script running");

  // Variable to store the previously copied element
  var prevCopiedElement = null;

  // Variable to store the current tooltip
  var currentTooltip = null;

  // Function to show a tooltip
  function showTooltip(element, message) {
    // Remove the existing tooltip if there is one
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

  // Event listener for clicks
  document.addEventListener('click', function(event) {
    var isWithinTargetArea = event.target.closest('.table-scroller') || event.target.tagName === 'text';

    if (!isWithinTargetArea) {
      // If the click is outside of the target areas, return and do nothing
      return;
    }

    event.preventDefault(); // Prevent the default action to avoid navigating away or other undesired behavior

    var selection = window.getSelection();
    var text = selection.toString();

    if (text.length > 0) {
      navigator.clipboard.writeText(text).then(function() {
        console.log(text);
        var element = selection.anchorNode.tagName === 'text' ? selection.anchorNode : selection.anchorNode.parentElement;
        showTooltip(element, 'Copied!');
      }).catch(function(err) {
        console.error('Failed to copy text: ', err);
      });
    } else {
      var textToCopy = event.target.textContent || event.target.value;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(function() {
          console.log('Text copied to clipboard');
          showTooltip(event.target, 'Copied!');
        }).catch(function(err) {
          console.error('Failed to copy text: ', err);
        });
      }
    }
  }); // Correctly closes the 'click' event listener
} // Correctly closes the mainContentScriptFunction


