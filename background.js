function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}


var data = null;
var _url_val= null;


loadJson();

function loadJson() {
    chrome.storage.sync.get('json', function(items) {
        data = JSON.parse(items.json);
        if (data) {
            chrome.contextMenus.removeAll();
            chrome.contextMenus.create({ "id": "CRX", "title": "AEM- Management", "contexts": ["all"] });
            chrome.contextMenus.create({ "id": "CRX299", "parentId": "CRX", "title": "Open page/component in CRX", "contexts": ["all"] });

            $.each(data.adminconsole.enviroments, function(index, info) {
                chrome.contextMenus.create({ "id": "CRX2" + index, "parentId": "CRX", "title": info.name, "contexts": ["all"] });
                chrome.contextMenus.create({ "id": "CRX3AUTHOR" + index, "parentId": "CRX2" + index, "title": "Author", "contexts": ["all"] });
                $.each(info.publish, function(index2, info2) {
                    chrome.contextMenus.create({ "id": "CRX3" + index + (index2 + 1), "parentId": "CRX2" + index, "title": "publish " + (index2 + 1), "contexts": ["all"] });
                })
            })

            chrome.contextMenus.onClicked.addListener(function(info, tab) {
                if ("CRX299" == info.menuItemId) {
                    openCrx(info, tab);
                } else {
                    if ((info.menuItemId).indexOf("CRX3AUTHOR") != -1) {
                        var _key = info.menuItemId.replace("CRX3AUTHOR", "").split("");
                        chrome.tabs.create({ url: data.adminconsole.enviroments[_key[0]].author });
                    } else {
                        var _key = info.menuItemId.replace("CRX3", "").split("");
                        chrome.tabs.create({ url: data.adminconsole.enviroments[_key[0]].publish[_key[1]].url });
                    }
                }
            });
        }


    });
}



chrome.storage.sync.set({ 'last_page_flag': 'false' }, function() {});
chrome.windows.onFocusChanged.addListener(function(window) {
    chrome.storage.sync.set({ 'last_page_flag': 'false' }, function() {});
});

function openCrx(info, tab) {
    if (!isEmpty(info.selectionText)) {
        openComponentCrx(info, tab);
    } else {
        openPageCrx(info, tab);
    }
}

function openPageCrx(info, tab) {
    var url = new URL(tab.url);
    var domain = url.pathname;
    var createProperties = { url: _url_val+"/crx/de/index.jsp#" + encodeURI(domain).replace('\.html', '') };
    chrome.tabs.create(createProperties);
}

function openComponentCrx(info, tab) {
    var url = new URL(tab.url);
    var domain = url.pathname;
    console.log(tab.toString());
    console.log(tab);

    chrome.tabs.executeScript(tab.id, {
        code: 'var redirect=\"' + _url_val+ "/crx/de/index.jsp#" + encodeURI(domain).replace('\.html', '') + '\"; var txt ="' + info.selectionText + '";'
    }, function() {
        chrome.tabs.executeScript(tab.id, {
            file: "common.js"
        });
    });
}





function getEnviromentColor(url) {
    var color = null;

    $.each(data.adminconsole.enviroments, function(indx, env) {
        if (url.indexOf(env.author) != -1) {
            color = env.color;
        }
    });
    return color;
}


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf("chrome://") == -1) {
        if (!(getEnviromentColor(tab.url) == null)) {
            var id = tab.id;
            chrome.tabs.executeScript(id, { code: "var color ='" + getEnviromentColor(tab.url) + "';" }, function() {
                chrome.tabs.executeScript(id, { file: "header.js" });
            });
        }
    }
});


chrome.tabs.onActivated.addListener(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
        var _url = new URL(tab[0].url);
        _url_val = _url.protocol + '//' + _url.hostname + (_url.port ? ':' + _url.port : '');
        chrome.storage.sync.set({ '_url_val': _url_val }, function() {});
    });
});


chrome.commands.onCommand.addListener(function(command) {

    chrome.tabs.getSelected(null, function(tab) {
        var myNewUrl = null;
        var tabUrl = tab.url;

        if (command == "edit") {
            if (tabUrl.indexOf("/editor.html/content/") == -1 && tabUrl.indexOf("/content/") != -1) {
                myNewUrl = tabUrl.replace("/content/", "/editor.html/content/").replace("?wcmmode=disabled", "");

                //Update the url here.
                chrome.tabs.update({ url: myNewUrl });
            }
        } else if (command == "publish") {
            if (tabUrl.indexOf("?wcmmode=disabled") == -1) {
                myNewUrl = tabUrl.replace("/editor.html/content/", "/content/") + "?wcmmode=disabled";
                chrome.tabs.update({ url: myNewUrl });
            }
        }
    })
});