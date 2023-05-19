chrome.webRequest.onBeforeRedirect.addListener(
    function (details) {
        if (details.redirectUrl.startsWith('com.openai.chat://')) {
            chrome.storage.local.set({url: details.redirectUrl}, function () {
                chrome.tabs.update(details.tabId, {url: 'auth.html'});
            });
            return {cancel: true};
        }
    },
    {urls: ["<all_urls>"]},
    ["responseHeaders"]
);
