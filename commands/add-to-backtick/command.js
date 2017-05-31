(function() {
  var extensionID = "daiejhinmmfgincamkeeobmpffhdljim";

  if (window.location.host !== "gist.github.com") {
    alert("You need to be on gist.github.com to add a command");
    return;
  }

  if (!chrome.runtime) {
    alert("Unable to communicate with Backtick");
    return;
  }

  var path = location.pathname;
  var gistID = path.slice(path.lastIndexOf("/") + 1);

  chrome.runtime.sendMessage(extensionID, {event: "add.commands", data: gistID});
})();