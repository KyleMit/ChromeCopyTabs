chrome.commands.onCommand.addListener(function(command) {
  if (command == "copy-tabs") {
	// declare html element
	var links = document.createElement("div");
  
	// only look for highlighted tabs in the current window
	queryInfo = new Object();
	queryInfo.highlighted  = true;
	queryInfo.currentWindow  = true;

	// get tabs
	chrome.tabs.query(queryInfo, function(tabs) {
		// loop through tab results
		for (var i = 0; i < tabs.length; i++) {
			//create elements
			var lineBreak = document.createElement("br");
			var link = document.createElement("a");
			
			//edit hyperlink
			link.innerHTML = tabs[i].title;
			link.href = tabs[i].url;
			
			//add elements to div
			links.appendChild(link);
			links.appendChild(lineBreak);
		}
		
		//copy text to clipboard
		copyTextToClipboard(links.outerHTML);
	});
  }
});

// Copy provided html to the clipboard.
function copyTextToClipboard(html) {
    var tmpNode = document.createElement('div');
    tmpNode.innerHTML = html;
    document.body.appendChild(tmpNode);

    // Back up previous selection
    var selection = window.getSelection();
    var backupRange;
    if (selection.rangeCount) {
        backupRange = selection.getRangeAt(0).cloneRange();
    }

    // Copy the contents
    var copyFrom = document.createRange();
    copyFrom.selectNodeContents(tmpNode)
    selection.removeAllRanges();
    selection.addRange(copyFrom);
    document.execCommand('copy');

    // Clean-up
    tmpNode.parentNode.removeChild(tmpNode);

    // Restore selection
    selection = window.getSelection();
    selection.removeAllRanges();
    if (backupRange) {
        selection.addRange(backupRange);
    }
}