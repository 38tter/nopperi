chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request == "clicked") {
        var links = document.getElementsByClassName('notion-page-content');
        var e = links[0].childNodes;
        for (var i = 0; i < e.length; ++i) {
            var a = e[i].getElementsByTagName('a')
            if (!a.length) {
                continue;
            }
            chrome.runtime.sendMessage(
                {
                    message: "fetch",
                    //a tag は 1 個しか含まれていない（多分）
                    url: a[0].href
                },
                function (res) {
                    console.log(res);
                }
            );
            chrome.runtime.sendMessage({
                message: "remove",
            }, res => console.log(res));
        }
        sendResponse({ text: 'clickedResponse' });
    }
    if (request == "subTab") {
        sendResponse("subtab");
    }
    return true
});
