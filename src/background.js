chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({url: 'https://ai-' + yesterday() + '.fakeopen.com/auth'});
});

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

function yesterday() {
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    let prev = new Date(now.getTime() - 864e5 - now.getTimezoneOffset() * 6e4);
    return prev.toISOString().substring(0, 10).replaceAll('-', '');
}
