var image = document.createElement("img");
image.src = chrome.extension.getURL("pet_image/1r.png");
document.getElementsByTagName("body")[0].appendChild(image);
