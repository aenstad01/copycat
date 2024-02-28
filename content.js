(function() {
  console.log("copycat running");
  let currentTooltip = null;
  
  function removeCurrentTooltip() {
      if (currentTooltip) {
          document.body.removeChild(currentTooltip);
          currentTooltip = null;
      }
  }
  
  document.addEventListener('click', function(e) {
      // Ignore clicks on rows with the class 'adv-table-header-row'
      if (e.target.closest('.adv-table-header-row')) {
          return;
      }
      
      let targetElement = e.target;
      
      // Special handling for SVG <text> elements within <g>
      if (targetElement.tagName.toLowerCase() === 'text' && 
          (targetElement.closest('g.header-value') || targetElement.closest('g.cell'))) {
          // Directly use the <text> element's content
          copyTextContent(targetElement.textContent);
          e.preventDefault();
          return;
      }
      
      // Navigate up to the relevant parent if the click isn't directly on a target element
      if (!targetElement.matches('.mdc-data-table__header-cell, td')) {
          targetElement = targetElement.closest('.mdc-data-table__header-cell, td');
      }
  
      if (targetElement) {
          let valueToCopy = getText(targetElement).trim();
          console.log(valueToCopy);
          if (valueToCopy.length > 0) {
              copyTextContent(valueToCopy);
              e.preventDefault();
          }
      }
  }, false);
  
  function getText(node) {
      if (node.nodeType === Node.TEXT_NODE) {
          return node.nodeValue;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches('.percentage-value, .summary-text')) {
              return ''; // Ignore these elements
          }
          return Array.from(node.childNodes).map(getText).join('');
      }
      return '';
  }
  
  function copyTextContent(text) {
      navigator.clipboard.writeText(text).then(function() {
          showTooltip('Copied: ' + text);
      }).catch(function(error) {
          console.error('Could not copy text: ', error);
      });
  }
  
  function showTooltip(message) {
      removeCurrentTooltip();
      const tooltip = document.createElement('div');
      tooltip.textContent = message;
      tooltip.style.position = 'fixed'; // Use 'fixed' to position relative to the viewport
      tooltip.style.left = '50%'; // Center horizontally in the viewport
      tooltip.style.bottom = '40px'; // Position 20px from the bottom of the viewport
      tooltip.style.transform = 'translateX(-50%)'; // Shift it to the left by half its width to truly center it
      tooltip.style.backgroundColor = 'black';
      tooltip.style.color = 'white';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.zIndex = '1000';
      tooltip.style.opacity = '1';
      tooltip.style.transition = 'opacity 0.3s ease-out';
  
      document.body.appendChild(tooltip);
      currentTooltip = tooltip;
      setTimeout(removeCurrentTooltip, 3000); // Adjusted to 3 seconds for visibility
  }
  
  })();
