chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, "clicked", (res) => {
        console.log(res);
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
});

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "fetch") {
            const url = request.url;
            chrome.tabs.create({ url: url });
            sendResponse('sendMessageFinished.');
        }
        if (request.message == "subTab") {
            sendResponse('subTab');
        }
        if (request.message == "remove") {
            chrome.tabs.getSelected(null, tab => {
                chrome.tabs.remove(tab.id);
            });
            sendResponse('removeEnd');
        }
        return true;
    }
)

const tabCreate = async (url) => {
    chrome.tabs.create({ url: url });
}
