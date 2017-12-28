function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}


chrome.contextMenus.removeAll();
chrome.contextMenus.create({ "id":"AA","title": "Open page/Component in crx", "contexts":["all"]});

//chrome.contextMenus.onClicked.addListener(openPageCrx);
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

    chrome.tabs.executeScript(tab.id, { 
        code: 'var redirect=\"'+"http://localhost:4502/crx/de/index.jsp#"+ encodeURI(domain).replace('\.html','')+'\"; var txt ="' + info.selectionText + '";'
    },function(){
        chrome.tabs.executeScript(tab.id, { 
            file: "common.js" 
        });
    });       
}


/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // make sure the status is 'complete' and it's the right tab
    if (changeInfo.status == 'complete') {
        chrome.tabs.executeScript(null, { 
            code: "$('body').html('A');" 
        });
    }
});*/


chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("examples/dashboard.html") });
});



/*
function fetchItOO(info, tab){
   //alert(encodeURI(info.selectionText));
     var url = new URL(tab.url)
     var domain = url.pathname;
      chrome.storage.sync.set({'text': info.selectionText}, function() {
            alert('Settings saved');
        });


    var createProperties = {url: "http://localhost:4502/crx/de/index.jsp#"+ encodeURI(domain).replace('\.html','')};
    chrome.tabs.create(createProperties);
     chrome.tabs.executeScript(null, { 
            file: "common.js" 
        ,);
}*/


