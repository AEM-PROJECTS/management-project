$().ready(function(){
    chrome.storage.sync.set({'last_page': 'curl'}, function() { });
    /*var xhr = new XMLHttpRequest();
    var params = "cmd=activate&path=/content/enel-it/it";
    xhr.open('POST', "http://localhost:4502/libs/wcm/core/content/reference.json", false, "admin", "admin");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() 
    {
    if (xhr.readyState == 4 && xhr.status == 200) 
    {
    // JSON.parse does not evaluate the attacker's scripts.
     /* var resp = xhr.responseText;
    var xmlDoc = $.parseXML( resp ),
    $xml = $( xmlDoc ),
    $issue = $xml.find("issue"); 
    }
    }
    xhr.send(params); */

});







