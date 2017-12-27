var data = null;

$().ready(function(){
  $.getJSON("data.json", function(json) {
    data = json.query;
  });
});

document.getElementById("view_components").addEventListener("click", components);
document.getElementById("view_templates").addEventListener("click", page_templates);
document.getElementById("submit_query").addEventListener("click", submit_query);




var jsonPrettyPrint = {
   replacer: function(match, pIndent, pKey, pVal, pEnd) {
      var key = '<span class=json-key>';
      var val = '<span class=json-value>';
      var str = '<span class=json-string>';
      var r = pIndent || '';
      if (pKey)
         r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
      if (pVal)
         r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
      return r + (pEnd || '');
      },
   toHtml: function(obj) {
      var jsonLine =
         /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3)
         .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
         .replace(/</g, '&lt;').replace(/>/g, '&gt;')
         .replace(jsonLine,jsonPrettyPrint.replacer);
      }
   }; 



function submit_query(){
	var url = $('#submit_query_input').val();
	alert(url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = xhr.responseText;
            $('#code').html('<pre><code>'+jsonPrettyPrint.toHtml(JSON.parse(resp))+'</code></pre>');
                console.log(resp);    
            }
        }
    xhr.send();  
};


function page_templates(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', data[1].url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = xhr.responseText;
            $('#code').html('<pre><code>'+jsonPrettyPrint.toHtml(JSON.parse(resp))+'</code></pre>');
                console.log(resp);    
            }
        }
    xhr.send();  
};

function components(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', data[0].url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = xhr.responseText;
            $('#code').html('<pre><code>'+jsonPrettyPrint.toHtml(JSON.parse(resp))+'</code></pre>');
                console.log(resp);    
                   $('.json-key').click(function() {
                                            if($( this ).text() == 'path'){
                                                 view_component_details($( this ).next().text());
                                            }
                                        });

            }
        }
    xhr.send();                    
};



        function view_component_details(val){
            var url = val.replace(new RegExp('\"', 'g'), '');
            url = url.replace('/apps/','');
            var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:4502/bin/querybuilder.json?path=/content&1_property=sling:resourceType&1_property.value='+url+'&1_property.operation=like&orderby:path', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = xhr.responseText;
            $('#code').html('<pre><code>'+jsonPrettyPrint.toHtml(JSON.parse(resp))+'</code></pre>');
                console.log(resp);    
            }
        }
    xhr.send();  

        }