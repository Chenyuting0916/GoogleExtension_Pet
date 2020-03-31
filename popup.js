document.addEventListener("DOMContentLoaded", function() {
  var add = document.getElementById("add");
  add.addEventListener("click", function() {
    chrome.tabs.executeScript(null, {file: "pet.js"});
  });
});
