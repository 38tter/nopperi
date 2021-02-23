chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, "clicked", (res) => {
        console.log(res);
    });
});

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "fetch") {
            const url = request.url;
            (async () => {
                await tabCreate(url);
                chrome.tabs.getSelected(null, tab => {
                    chrome.tabs.sendMessage(tab.id, "subTab", (res) => {
                        sendResponse(res);
                    });
                });
            })();
            sendResponse('sendMessageFinished.')
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
