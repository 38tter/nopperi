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
            chrome.runtime.sendMessage(
                {
                    message: "subTab",
                },
                function (res) {
                    var links = document.getElementsByClassName('notion-page-content');
                    var e = links[0].childNodes;
                    for (var i = 0; i < e.length; ++i) {
                        var a = e[i].getElementsByTagName('a')
                        if (!a.length) {
                            continue;
                        }
                    }
                }
            )
        }
        sendResponse({ text: 'clickedResponse' });
    } else if (request == "secondClicked") {
        var pageContent = document.getElementsByClassName('notion-page-content');
        sendResponse({ message: pageContent[0].innerHTML })
    } else if (request.message == "addToOriginalPage") {
        var links = document.getElementsByClassName('notion-page-content');
        var e = links[0].childNodes;
        console.log(request.text);

        console.log(links[0].childNodes);
        links[0].insertAdjacentHTML('afterend', request.text);
        sendResponse("add done!")
    }
    return true
});
