function blockRequest(details) {
    console.log("Blocked: ", details.url);
    return {
        cancel: true
    };
}

if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
}

try {
    chrome.webRequest.onBeforeRequest.addListener(
        blockRequest,
        {urls: ['https://chat.openai.com/api/auth/callback/auth0?*']},
        ['blocking']
    );
} catch (e) {
    console.error(e);
}
