var data = null;
    var origin = window.location.href;
    var url = origin.split('/')[origin.split('/').length - 1];

$().ready(function(){
      setTimeout(function(){ 
       chrome.storage.sync.get(['last_page','last_page_flag'], function(items) {
        if(items.last_page_flag == 'false' && items.last_page && (url != items.last_page)){
          window.location.href = origin.replace(url, items.last_page);
        }
         chrome.storage.sync.set({'last_page': 'settings.html', 'last_page_flag':'true'}, function() { });
       });
    }, 1000);

    chrome.storage.sync.get('json', function(items) {
        console.log('Settings retrieved', items.json);
        data = JSON.parse(items.json);
    });
});



document.getElementById("submit").addEventListener("click", loadData);
document.getElementById("importapi").addEventListener("click", loadDataApi);

function loadDataApi(){

   var xhr = new XMLHttpRequest();
                                xhr.open('GET', $('#importapipath').val(), true);
                                xhr.onreadystatechange = function() 
                                {
                                    if (xhr.readyState == 4) 
                                    {
                                        // JSON.parse does not evaluate the attacker's scripts.
                                        var resp = JSON.parse(xhr.responseText);
                                         alert(JSON.stringify(resp));
                                         chrome.storage.sync.set({'json': JSON.stringify(resp[0])}, function() {
                                                    console.log('Settings saved');
                                                });
                                     }
                                 }
                                   xhr.send();  
}


function loadData(){
 var file = document.getElementById('myFile').files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            var json = JSON.parse(e.target.result);
            chrome.storage.sync.set({'json': JSON.stringify(json)}, function() {
                alert(JSON.stringify(json));
                console.log('Settings saved');
            });
        };
    }
}   
