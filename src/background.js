var openedTabIds = [];
var originalTabId;
var addedHTML;
var clickedFlg = false;

chrome.browserAction.onClicked.addListener((tab) => {
    clickedFlg = true;
    chrome.tabs.sendMessage(tab.id, "clicked", (res) => {
        originalTabId = tab.id;
        console.log(res);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, t => {
        if (changeInfo.status == "complete" && tab.index == 0 && clickedFlg) {
            chrome.tabs.sendMessage(tab.id, "secondClicked", (res) => {
                openedTabIds.push(tab.id);
                addedHTML = res.message;
                chrome.tabs.remove(tab.id);
            });
        }
    });
});


chrome.tabs.onRemoved.addListener((tabId, removedInfo) => {
    if (openedTabIds.includes(tabId)) {
        chrome.tabs.sendMessage(originalTabId, { message: "addToOriginalPage", text: addedHTML }, (res) => {
            console.log(res);
        });
        clickedFlg = false;
    }
});

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "fetch") {
            const url = request.url;
            chrome.tabs.create({ url: url });
            sendResponse('sendMessageFinished.');
        }
        if (request.message == "subTab") {
            chrome.tabs.query({ active: true, currentWindow: true }, tab => {
                chrome.tabs.move(tab[0].id, { index: 0 }, (tab) => { });
            });
            sendResponse('subTabDone');
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
