  var data = null;
  var origin = window.location.href;
  var url = origin.split('/')[origin.split('/').length - 1];

  $().ready(function() {

      setTimeout(function() {
          chrome.storage.sync.get(['last_page', 'last_page_flag'], function(items) {
              if (items.last_page_flag == 'false' && items.last_page && (url != items.last_page)) {
                  window.location.href = origin.replace(url, items.last_page);
              }
              chrome.storage.sync.set({ 'last_page': 'redmine.html', 'last_page_flag': 'true' }, function() {});
          });
      }, 1000);

      chrome.storage.sync.get(['json'], function(items) {
          console.log('Settings retrieved', items.json);
          data = JSON.parse(items.json);
          $.each(data.team, function(index, val) {
              issues_me(val.url + val.tables[0].query + val.api_key);
              issues_team(val.url + val.tables[1].query + val.api_key);
          });

      });
  });




  function issues_team(query) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', query, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
              // JSON.parse does not evaluate the attacker's scripts.
              var resp = xhr.responseText;
              var xmlDoc = $.parseXML(resp),
                  $xml = $(xmlDoc),
                  $issue = $xml.find("issue");

              $('#customlist_header').append(
                  '<li><a href="#team" data-toggle="tab">' +
                  '  <i class="material-icons">bug_report</i>TEAM ISSUES' +
                  '<div class="ripple-container"></div>' +
                  ' </a></li>');


              var html = "";
              for (i = 0; i < $issue.length; i++) {
                  html += '<tr><td>' + $issue[i].getElementsByTagName('project')[0].getAttribute('name') + "/" + $issue[i].getElementsByTagName('id')[0].innerHTML + '</td>';
                  html += '<td class="td-actions" style="display:block; text-align:right;"><a target="_blank" href="http://redmine.aem6.it/redmine/issues/' + $issue[i].getElementsByTagName('id')[0].innerHTML + '">' + $issue[i].getElementsByTagName('subject')[0].innerHTML + '</a></td>';
                  html += '<td>' + $issue[i].getElementsByTagName('status')[0].getAttribute('name') + '</td></tr>';
              }

              $('#customlist_body').append('<div class="tab-pane" id="team">' +
                  '<div class="tab-pane" id="team">' +
                  '<table class="table">' +
                  '<tbody>' +
                  html +
                  '</tbody>' +
                  '</table>' +
                  '</div>');


          }
      }
      xhr.send();

      $(window).resize();
  };




  function issues_me(query) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', query, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
              // JSON.parse does not evaluate the attacker's scripts.
              var resp = xhr.responseText;
              var xmlDoc = $.parseXML(resp),
                  $xml = $(xmlDoc),
                  $issue = $xml.find("issue");



              $('#customlist_header').append(
                  '<li class="active"><a href="#me" data-toggle="tab">' +
                  '  <i class="material-icons">bug_report</i>My Issues' +
                  '<div class="ripple-container"></div>' +
                  ' </a></li>');

              var html = "";

              for (i = 0; i < $issue.length; i++) {
                  html += '<tr><td>' + $issue[i].getElementsByTagName('project')[0].getAttribute('name') + "/" + $issue[i].getElementsByTagName('id')[0].innerHTML + '</td>';
                  html += '<td class="td-actions" style="display:block; text-align:right;"><a target="_blank" href="http://redmine.aem6.it/redmine/issues/' + $issue[i].getElementsByTagName('id')[0].innerHTML + '">' + $issue[i].getElementsByTagName('subject')[0].innerHTML + '</a></td>';
                  html += '<td>' + $issue[i].getElementsByTagName('status')[0].getAttribute('name') + '</td></tr>';
              }


              $('#customlist_body').append('<div class="tab-pane active" id="me">' +
                  '<div class="tab-pane active" id="me">' +
                  '<table class="table">' +
                  '<tbody>' +
                  html +
                  '</tbody>' +
                  '</table>' +
                  '</div>');



          }
      }
      xhr.send();

  };