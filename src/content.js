chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request == "clicked") {
        console.log('clicked');
    }
});