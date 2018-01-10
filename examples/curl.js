$().ready(function() {
    setTimeout(function() {
        chrome.storage.sync.get(['last_page', 'last_page_flag'], function(items) {
            if (items.last_page_flag == 'false' && items.last_page && (url != items.last_page)) {
                window.location.href = origin.replace(url, items.last_page);
            }
            chrome.storage.sync.set({ 'last_page': 'curl.html', 'last_page_flag': 'true' }, function() {});
        });
    }, 1000);
});