$(document).ready(function () {

  $("#add").click(function () {
    if ($("#petList").css("display") == "none")
      $("#petList").css("display", "block");
    else
      $("#petList").css("display", "none");
  });

  $("#petList a").click(function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { petName: e.target.name }, function (response) {
      });
    });
  });

});


