    var data = null;
    var origin = window.location.href;
    var url = origin.split('/')[origin.split('/').length - 1];

    $().ready(function() {
        setTimeout(function() {
            chrome.storage.sync.get(['last_page', 'last_page_flag', 'isInstance'], function(items) {
                if (items.last_page_flag == 'false' && items.last_page && (url != items.last_page)) {
                    window.location.href = origin.replace(url, items.last_page);
                }
                chrome.storage.sync.set({ 'last_page': 'dashboard.html', 'last_page_flag': 'true' }, function() {});

                if (items.isInstance.indexOf('true') != -1) {
                    $('.isInstance').show();
                }
            });
        }, 50);

        chrome.storage.sync.get('json', function(items) {
            data = JSON.parse(items.json);
            global_data(data);
            links_list(data);
            customlist(data);
        });

        $('a').click(function() {
            var _key = $(this).data("querystring-key");
            var _val = $(this).data("querystring-value");

            if ("wcmmode".indexOf(_key) != -1) {
                toggleWcmmode(_val);
            } else if ("ui".indexOf(_key) != -1) {
                toggleUI(_val);
            } else if ("debug".indexOf(_key) != -1) {
                toggleActions(_val);
            }
        });

        $("#sectionA").click(function() {
            $("#blockB").hide();
            $("#blockA").show();
        });
        $("#sectionB").click(function() {
            $("#blockA").hide();
            $("#blockB").show();
        });




    });




    function toggleUI(actions) {
        chrome.tabs.getSelected(null, function(tab) {
            var _url = new URL(tab.url);
            var redirect = "";
            if ("ui-crxdeLite".indexOf(actions) != -1) {
                redirect = _url.protocol + '//' + _url.hostname + (_url.port ? ':' + _url.port : '');
                redirect = redirect.replace(redirect, redirect + "/crx/de");
            } else if ("ui-contentFinder".indexOf(actions) != -1) {


                redirect = _url.protocol + '//' + _url.hostname + (_url.port ? ':' + _url.port : '') + "/cf#";
                redirect = _url.href.replace(_url.protocol + '//' + _url.hostname + (_url.port ? ':' + _url.port : ''), redirect);
            }
            chrome.tabs.update({ url: redirect });
        })
    }

    function toggleActions(actions) {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.update({ url: tab.url + "?debug=" + actions });
        })
    }

    function toggleWcmmode(actions) {
        chrome.tabs.getSelected(null, function(tab) {
            if (actions.indexOf("disabled") != -1) {
                myNewUrl = tab.url.replace("/editor.html/content/", "/content/") + "?wcmmode=disabled";
                chrome.tabs.update({ url: myNewUrl });
            } else
                chrome.tabs.update({ url: tab.url + "?wcmmode=" + actions });
        })
    }




    function global_data(json) {

        var ele = function(val, links) {
            var _thtml = "";
            $.each(links, function(index, link) {
                _thtml += ' <a href=' + link.url + val.url + '>' + link.name + '&nbsp;&nbsp;</a>';

            });
            return '<div class="tab-pane active" id="global">' +
                '<table class="table">' +
                '<tbody>' +
                '<tr>' +
                '<td>' + val.name + '</td>' +
                '<td class="td-actions" style="display:block; text-align:right;">' + _thtml + '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>';
        }


        $.each(json.adminconsole.links, function(index, val) {

            if (index == 0) {
                $('#adminconsole_header').append('<li class="active">' +
                    '<a href="#global" data-toggle="tab">' +
                    '  <i class="material-icons">bug_report</i> Author links' +
                    '<div class="ripple-container"></div>' +
                    ' </a></li>');
            }



            $('#adminconsole_body').append(ele(val, json.adminconsole.enviroments));

        });

        $(".link").click(function() {
            window.location.href = $(this).data("href");
        });
    }


    function links_list(json) {

        var create_body = function(_index, val) {
            var _thtml = '<tr><td><b>Author</b></td><td class="td-actions" style="display:block; text-align:right;"><a href=' + val.author + '>' + val.author + '</a></td></tr>';

            $.each(val.publish, function(index, link) {
                _thtml += '<tr><td><b>Publish ' + (index + 1) + ':</b> </td>' + '<td class="td-actions" style="display:block; text-align:right;">' +
                    '<a href=' + link.url + '>' + link.url + '&nbsp;&nbsp;</a></td></tr>';

            });

            var _thtmlfull = '<div class="tab-pane active" id="' + val.name + '">';
            if (_index != 0)
                _thtmlfull = '<div class="tab-pane" id="' + val.name + '">';


            return _thtmlfull +
                '<div class="tab-pane active" id="' + val.name + '">' +
                '<table class="table">' +
                '<tbody>' +
                _thtml + '</tbody>' +
                '</table>' +
                '</div>';
        }


        $.each(json.adminconsole.enviroments, function(index, val) {
            var _thtmlfull = '<li class="active">';
            if (index != 0)
                _thtmlfull = '<li>';

            $('#linklist_header').append(_thtmlfull +
                '<a href="#' + val.name + '" data-toggle="tab">' +
                '  <i class="material-icons">bug_report</i>' + val.name +
                '<div class="ripple-container"></div>' +
                ' </a></li>');




            $('#linklist_body').append(create_body(index, val));

        });

        $(".link").click(function() {
            window.location.href = $(this).data("href");
        });
    }






    function customlist(json) {

        var create_body = function(_index, val) {
            var _thtml = '';

            $.each(val.custom, function(index, link) {
                _thtml += '<tr><td><b>' + link.name + ':</b> </td>' + '<td class="td-actions" style="display:block; text-align:right;">' +
                    '<a href=' + link.url + '>' + link.url + '&nbsp;&nbsp;</a></td></tr>';

            });

            var _thtmlfull = '<div class="tab-pane active" id="custom_' + val.name + '">';
            if (_index != 0)
                _thtmlfull = '<div class="tab-pane" id="custom_' + val.name + '">';


            return _thtmlfull +
                '<div class="tab-pane active" id="custom_' + val.name + '">' +
                '<table class="table">' +
                '<tbody>' +
                _thtml + '</tbody>' +
                '</table>' +
                '</div>';
        }


        $.each(json.adminconsole.enviroments, function(index, val) {
            var _thtmlfull = '<li class="active">';
            if (index != 0)
                _thtmlfull = '<li>';

            $('#customlist_header').append(_thtmlfull +
                '<a href="#custom_' + val.name + '" data-toggle="tab">' +
                '  <i class="material-icons">bug_report</i>' + val.name +
                '<div class="ripple-container"></div>' +
                ' </a></li>');




            $('#customlist_body').append(create_body(index, val));

        });

        $(".link").click(function() {
            window.location.href = $(this).data("href");
        });
    }