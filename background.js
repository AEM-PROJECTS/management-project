function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

/**
 * Converts an array of strings with key value pairs separated by an
 * equals sign.
 *
 * Certain responses with JSON Sling selectors to the Felix console returns
 * this proprietary format.
 *
 * @param {Array} array of strings
 * @returns {JSON} JSON object created from array
 */
function convertSlingArrayToObject(slingArray) {
    var SEPARATOR = ' = ',
        slingObject = {},
        tmp,
        x;

    for (x = 0; x < slingArray.length; x++) {
        tmp = slingArray[x].split(SEPARATOR);
        slingObject[tmp[0]] = tmp[1];
    }

    return slingObject;
}



var data = null;
var _url_val = null;
var _url_val_full = "";


loadJson();

function loadJson() {
    chrome.storage.sync.get('json', function(items) {
        data = JSON.parse(items.json);
        if (data) {
            chrome.contextMenus.removeAll();
            chrome.contextMenus.create({ "id": "CRX", "title": "AEM- Management", "contexts": ["all"] });
            chrome.contextMenus.create({ "id": "CRX299", "parentId": "CRX", "title": "Open page/component in CRX", "contexts": ["all"] });
            chrome.contextMenus.create({ "id": "CRX298", "parentId": "CRX", "title": "Dowload this page to test", "contexts": ["all"] });
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

                } else if ("CRX298" == info.menuItemId) {
                    downloadPage(info, tab);
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

function downloadPage(info, tab) {

    var txt;
    var person = prompt("Please enter package name:", "test_package");
    if (person == null || person == "") {
        txt = "test_package";
    } else {
        txt = "" + person;
    }

    var data3 = null;


    if (_url_val) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {

            }
        });

        xhr.open("POST", "http://admin:admin@" + _url_val.replace("http//", "").replace("http://", "") + "/crx/packmgr/service/.json/?cmd=create&packageName=" + txt + "&groupName=my_packages");

        //xhr.open("POST", 'http://admin:admin@localhost:4502/crx/packmgr/update.jsp?path=/etc/packages/tester/test.zip&packageName=test&groupName=tester&filter=[{root: "/content/err", rules: [{modifier: "include", pattern: "/r"}]}]');
        xhr.setRequestHeader("CSRF-Token", "eyJleHAiOjE1MTU0MTI5MTcsImlhdCI6MTUxNTQxMjMxN30.EsAf8taSdn_gLo6FX5xSWGVYJOEHrvC9sDw5KXwybWg");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "e15e4db2-6864-0d61-ded5-6948740277b1");

        xhr.send(data3);

        setTimeout(function() {
            var _callback = function(results) {
                // ToDo: Do something with the image urls (found in results[0])

                document.body.innerHTML = '';
                var _url_full = new URL(_url_val_full);
                var text_url = _url_full.pathname.substring(0, _url_full.pathname.indexOf(".html"));
                if (_url_full.href.indexOf("editor.html/content/") != -1) {
                    text_url = _url_full.href.substring(_url_full.href.indexOf("/content/"), _url_full.href.length);
                    text_url = text_url.replace(".html", "");
                }

                var filter = '[{root: "' + text_url + '", rules: []}';

                for (var i in results[0]) {
                    var img = document.createElement('img');
                    img.src = results[0][i];
                    if (img.src.indexOf("/content/dam/") != -1) {
                        var _imgurl = new URL(img.src);
                        filter += ',{root: "' + _imgurl.pathname + '", rules: []}';
                    }
                }
                filter += ']';
                var xhr2 = new XMLHttpRequest();
                xhr2.withCredentials = false;
                xhr2.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {

                    }
                });
                xhr2.open("POST", 'http://admin:admin@' + _url_val.replace("http//", "").replace("http://", "") + '/crx/packmgr/update.jsp?path=/etc/packages/my_packages/' + txt + '.zip&packageName=' + txt + '&groupName=my_packages&filter=' + filter);
                xhr2.setRequestHeader("CSRF-Token", "eyJleHAiOjE1MTU0MTI5MTcsImlhdCI6MTUxNTQxMjMxN30.EsAf8taSdn_gLo6FX5xSWGVYJOEHrvC9sDw5KXwybWg");
                xhr2.setRequestHeader("Cache-Control", "no-cache");
                xhr2.setRequestHeader("Postman-Token", "e15e4db2-6864-0d61-ded5-6948740277b1");

                xhr2.send(data3);
            };

            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.executeScript(tabs[0].id, {
                    code: 'Array.prototype.map.call(document.images, function (i) { return i.src; });'
                }, _callback);
            });
        }, 1000);

        setTimeout(function() {
            chrome.tabs.query({ active: true, currentWindow: true }, function(arrayOfTabs) {

                var activeTab = arrayOfTabs[0];
                var activeTabId = activeTab.url;
                chrome.tabs.create({ url: _url_val + "/crx/packmgr/index.jsp" });

            });

        }, 1500);


    }
}


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
    var createProperties = { url: _url_val + "/crx/de/index.jsp#" + encodeURI(domain).replace('\.html', '') };
    chrome.tabs.create(createProperties);
}

function openComponentCrx(info, tab) {
    var url = new URL(tab.url);
    var domain = url.pathname;
    console.log(tab.toString());
    console.log(tab);

    chrome.tabs.executeScript(tab.id, {
        code: 'var redirect=\"' + _url_val + "/crx/de/index.jsp#" + encodeURI(domain).replace('\.html', '') + '\"; var txt ="' + info.selectionText + '";'
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
        if (tab[0].url.indexOf("chrome:") == -1 && tab[0].url.indexOf("chrome-extension:") == -1) {
            var responseText;
            var _data = null;
            var xmlhttp = new XMLHttpRequest();
            var _url = new URL(tab[0].url);
            _url_val_full = tab[0].url;
            _url_val = _url.protocol + '//' + _url.hostname + (_url.port ? ':' + _url.port : '');
            chrome.storage.sync.set({ '_url_val': _url_val, '_url_val_full': _url_val_full, 'isInstance': 'false' }, function() {});

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

                    responseText = xmlhttp.responseText;
                    responseText = responseText.replace(/\\/g, '\\\\');

                    data = JSON.parse(responseText);
                    var array_ = convertSlingArrayToObject(data);
                    var html = "<b>Instance info</b><pre>";
                    html += "<b>Sling ID: </b>" + array_["Sling ID"] + "<br>";
                    html += "<b>Sling Name: </b>" + array_["Sling Name"] + "<br>";
                    html += "<b>Sling Home: </b>" + array_["Sling Home"] + "<br>";
                    html += "<b>Sling Home URL: </b>" + array_["Sling Home URL"] + "<br>";
                    html += "<b>Run Modes: </b>" + array_["Run Modes"] + "<br></pre>";
                    chrome.storage.sync.set({ 'isInstance': 'true', 'slingInfo': html });
                }
            }

            xmlhttp.open('GET', _url_val + '/system/console/status-slingsettings.json', true);
            xmlhttp.send();


            var xmlhttp2 = new XMLHttpRequest();
var responseText2;
            xmlhttp2.onreadystatechange = function() {
                if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {

                    responseText2 = xmlhttp2.responseText;
                    responseText2 = responseText2.replace(/\\/g, '\\\\');

                    _data = JSON.parse(responseText2);
                    var array_ = convertSlingArrayToObject(_data);
                      var html = "<b>System info</b><pre>";
                      html += "<b>java.runtime.name: </b>" + array_["java.runtime.name"] + "<br>";
                      html += "<b>java.runtime.version: </b>" + array_["java.runtime.version"] + "<br>";
                      html += "<b>java.vendor: </b>" + array_["java.vendor"] + "<br>";
                      html += "<b>os.name: </b>" + array_["os.name"] + "<br>";
                      html += "<b>os.version: </b>" + array_["os.version"] + "<br></pre>";
                    chrome.storage.sync.set({'systemInfo': html });
                }
            }

            xmlhttp2.open('GET', _url_val + '/system/console/status-System%20Properties.json', true);
            xmlhttp2.send();


            
        }
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