function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}


chrome.contextMenus.removeAll();
chrome.contextMenus.create({ "id":"CRX","title": "Open page/Component in crx", "contexts":["all"]});

chrome.contextMenus.onClicked.addListener(openCrx);

function openCrx(info, tab){
    if(!isEmpty(info.selectionText)){
        openComponentCrx(info, tab);
    }else{
      openPageCrx(info, tab);  
    }
}

function openPageCrx(info, tab){
    var url = new URL(tab.url);
    var domain = url.pathname;
    var createProperties = {url: "http://localhost:4502/crx/de/index.jsp#"+ encodeURI(domain).replace('\.html','')};
        chrome.tabs.create(createProperties);
}

function openComponentCrx(info, tab){
    var url = new URL(tab.url);
    var domain = url.pathname;
    console.log(tab.toString());
    console.log(tab);
       /* var systemInfo = convertSlingArrayToObject(tab.data);
        alert(systemInfo.toString());*/

   /* chrome.tabs.executeScript(tab.id, { 
        code: 'var redirect=\"'+"http://localhost:4502/crx/de/index.jsp#"+ encodeURI(domain).replace('\.html','')+'\"; var txt ="' + info.selectionText + '";'
    },function(){
        chrome.tabs.executeScript(tab.id, { 
            file: "common.js" 
        });
    });       */
}




chrome.browserAction.onClicked.addListener(function () {
  
    chrome.tabs.create({ url: chrome.runtime.getURL("examples/dashboard.html") });
});