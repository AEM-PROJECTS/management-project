var data = null;
var origin_query = null;
var _url_val = null;

var $ = jQuery.noConflict();
var origin = window.location.href;
var url = origin.split('/')[origin.split('/').length - 1];

$().ready(function() {
    chrome.storage.sync.get({ '_url_val': _url_val }, function(items) {
        _url_val = items._url_val;
    });
    // Read it using the storage API
    chrome.storage.sync.get('json', function(items) {
        console.log('Settings retrieved', items.json);
        data = JSON.parse(items.json);
    });

    $('#filter_checkcontains, #filter_startsWith, #filter_matchcase, #filter_avoidduplicates, #filter_text').change(function() {

        var _json = JSON.parse(origin_query);
        _json = $.fn.filterJSON({ _json }, {
            property: ["path"], // mandatory
            wrapper: true,
            value: $('#filter_text').val(),
            checkContains: $('#filter_checkcontains').is(':checked'),
            startsWith: $('#filter_startsWith').is(':checked'),
            matchCase: $('#filter_matchcase').is(':checked'),
            avoidDuplicates: $('#filter_avoidduplicates').is(':checked'),
            sort: true,
            sortOrder: 'desc'
        });



        $('#code').html('<pre><code>' + jsonPrettyPrint.toHtml(_json) + '</code></pre>');
    });


});





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
            .replace(jsonLine, jsonPrettyPrint.replacer);
    }
};




document.getElementById("view_components").addEventListener("click", components);
document.getElementById("view_templates").addEventListener("click", page_templates);
document.getElementById("view_last_5_pages").addEventListener("click", view_last_5_pages);
document.getElementById("view_jar_files").addEventListener("click", view_jar_files);
document.getElementById("submit_query").addEventListener("click", submit_query);

function view_last_5_pages() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', _url_val + "/" + data.query[2].url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = xhr.responseText;
            origin_query = resp;
            $('#code').html('<pre><code>' + jsonPrettyPrint.toHtml(JSON.parse(resp)) + '</code></pre>');
            console.log(resp);
        }
    }
    xhr.send();
};

function view_jar_files() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', _url_val + "/" + data.query[3].url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = xhr.responseText;
            origin_query = resp;
            $('#code').html('<pre><code>' + jsonPrettyPrint.toHtml(JSON.parse(resp)) + '</code></pre>');
            console.log(resp);
        }
    }
    xhr.send();
};




function submit_query() {
    var url = $('#submit_query_input').val();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = xhr.responseText;
            origin_query = resp;
            $('#code').html('<pre><code>' + jsonPrettyPrint.toHtml(JSON.parse(resp)) + '</code></pre>');
            console.log(resp);
        }
    }
    xhr.send();
};


function page_templates() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', _url_val + "/" + data.query[1].url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = xhr.responseText;
            origin_query = resp;
            $('#code').html('<pre><code>' + jsonPrettyPrint.toHtml(JSON.parse(resp)) + '</code></pre>');
            console.log(resp);
        }
    }
    xhr.send();
};





function components() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', _url_val + "/" + data.query[0].url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = JSON.parse(xhr.responseText);
            origin_query = xhr.responseText;


            $('#code').html('<pre><code>' + jsonPrettyPrint.toHtml(resp) + '</code></pre>');
            $('.json-key').each(function() {
                if ($(this).text() == 'path') {
                    $(this).css("cursor", "pointer");
                    $(this).css("color", "blue");
                    $(this).click(function() {
                        view_component_details($(this).next().text());
                    });
                }
            });
        }
    }
    xhr.send();

}




function view_component_details(val) {
    if (_url_val != null) {
        var url = val.replace(new RegExp('\"', 'g'), '');
        url = url.replace('/apps/', '');
        var xhr = new XMLHttpRequest();

        xhr.open('GET', _url_val + "/" + 'bin/querybuilder.json?path=/content&1_property=sling:resourceType&1_property.value=' + url + '&1_property.operation=like&orderby:path', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var resp = xhr.responseText;
                $('#code').html('<pre><code>' + jsonPrettyPrint.toHtml(JSON.parse(resp)) + '</code></pre>');
                console.log(resp);
                $('body').css("height", "600px");
            }
        }
        xhr.send();
    }
}