
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

  // Styling the tooltip that shows when a user clicks to copy
  var tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.background = 'black';
  tooltip.style.color = 'white';
  tooltip.style.padding = '5px';
  tooltip.style.borderRadius = '5px';
  tooltip.style.fontSize = '12px';
  tooltip.style.zIndex = '1000';
  tooltip.textContent = message;

  // Get the bounding rectangle of the element to position the tooltip
  var rect = element.getBoundingClientRect();
  
  // Set the top position of the tooltip to be 30px above the element
  tooltip.style.top = (rect.top + window.scrollY - 30) + 'px';
  
  // Center the tooltip horizontally relative to the element
  tooltip.style.left = (rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

  // Append the tooltip to the body of the document
  document.body.appendChild(tooltip);
  currentTooltip = tooltip;

  // Set a timeout to remove the tooltip after 2 seconds
  setTimeout(function() {
    if (currentTooltip === tooltip) {
      document.body.removeChild(tooltip);
      currentTooltip = null;
    }
  }, 2000); 
}

document.addEventListener('click', function(event) {
  // Check if the clicked element or its ancestors have the class "table-scroller" or if it's an SVG text element
  //"table-scroller" targets the data table in the GA4 reports library. 'text' targets the GA4 Explore report.
  var isWithinTargetArea = event.target.closest('.table-scroller') || event.target.tagName === 'text';

  if (!isWithinTargetArea) {
    // If the click is outside of the target areas, return and do nothing
    return;
  }

  // Prevent the default action to avoid navigating away or other undesired behavior
  event.preventDefault();

  // Use the window.getSelection() method to get the selected text
  var selection = window.getSelection();
  var text = selection.toString();

  // Check if there's selected text
  if (text.length > 0) {
    // Copy the selected text to the clipboard
    navigator.clipboard.writeText(text).then(function() {
      console.log(text);
      // Show a tooltip indicating that the text has been copied
      var element = selection.anchorNode.tagName === 'text' ? selection.anchorNode : selection.anchorNode.parentElement;
      showTooltip(element, 'Copied!');
    }).catch(function(err) {
      console.error('Failed to copy text: ', err);
    });
  } else {
    // If no text is selected, try to get the text from the target element
    var textToCopy = event.target.textContent || event.target.value;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(function() {
        console.log('Text copied to clipboard');
        // Show a tooltip indicating that the text has been copied
        showTooltip(event.target, 'Copied!');
      }).catch(function(err) {
        console.error('Failed to copy text: ', err);
      });
    }
  }
});