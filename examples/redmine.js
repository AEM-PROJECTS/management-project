      var data = null;

    $().ready(function(){
                chrome.storage.sync.get(['json'], function(items) {
      console.log('Settings retrieved', items.json);
      data = JSON.parse(items.json);
       $.each(data.team,function(index, val){
                    issues_me(val.url+val.tables[0].query+val.api_key);
                    issues_team(val.url+val.tables[1].query+val.api_key);
                });
    });

        });




        function issues_team(query){
            var xhr = new XMLHttpRequest();
                                xhr.open('GET', query, true);
                                xhr.onreadystatechange = function() 
                                {
                                    if (xhr.readyState == 4) 
                                    {
                                        // JSON.parse does not evaluate the attacker's scripts.
                                        var resp = xhr.responseText;
                                      var xmlDoc = $.parseXML( resp ),
            $xml = $( xmlDoc ),
         $issue = $xml.find("issue");

        var html ="";
        html += '<div class="col-md-12"><div class="card"><div class="card-header" data-background-color="blue">' +
        '<h4 class="title">TEAM ISSUES</h4><p class="category"></p></div>'+
        '<h4 class="title"></h4><p class="category"></p></div>'+
        '<div class="card-content table-responsive"><table class="table"><thead class="text-primary">'+
        '<tr><th>ID</th><th>SUBJECT</th><th>STATUS</th></tr></thead><tbody>';


          for (i = 0; i < $issue.length; i++) { 
            html += '<tr><td>'+$issue[i].getElementsByTagName('project')[0].getAttribute('name')+"/"+ $issue[i].getElementsByTagName('id')[0].innerHTML+'</td>';
            html += '<td><a target="_blank" href="http://redmine/redmine/issues/'+$issue[i].getElementsByTagName('id')[0].innerHTML+'">'+$issue[i].getElementsByTagName('subject')[0].innerHTML+'</a></td>';
            html += '<td>'+$issue[i].getElementsByTagName('status')[0].getAttribute('name')+'</td></tr>';
            }

         html += '</tbody></table></div></div></div>';

        $('.content > .container-fluid > .row').append(html);

                                    }
                                }
                                xhr.send();  
          

        };


        function issues_me(query){
            var xhr = new XMLHttpRequest();
                                xhr.open('GET', query, true);
                                xhr.onreadystatechange = function() 
                                {
                                    if (xhr.readyState == 4) 
                                    {
                                        // JSON.parse does not evaluate the attacker's scripts.
                                        var resp = xhr.responseText;
                                        var xmlDoc = $.parseXML( resp ),
                                        $xml = $( xmlDoc ),
                                        $issue = $xml.find("issue");

                                        var html ="";
                                        html += '<div class="col-md-12"><div class="card"><div class="card-header" data-background-color="blue">' +
                                        '<h4 class="title">MY ISSUES</h4><p class="category"></p></div>'+
                                        '<h4 class="title"></h4><p class="category"></p></div>'+
                                        '<div class="card-content table-responsive"><table class="table"><thead class="text-primary">'+
                                        '<tr><th>ID</th><th>SUBJECT</th><th>STATUS</th></tr></thead><tbody>';


                                          for (i = 0; i < $issue.length; i++) { 
                                            console.log($issue[i].getElementsByTagName('id')[0]);
                                            html += '<tr><td>'+$issue[i].getElementsByTagName('project')[0].getAttribute('name')+"/"+$issue[i].getElementsByTagName('id')[0].innerHTML+'</td>';
                                            html += '<td><a target="_blank" href="http://redmine.aem6.it/redmine/issues/'+$issue[i].getElementsByTagName('id')[0].innerHTML+'">'+$issue[i].getElementsByTagName('subject')[0].innerHTML+'</a></td>';
                                            html += '<td>'+$issue[i].getElementsByTagName('status')[0].getAttribute('name')+'</td></tr>';
                                            }

                                         html += '</tbody></table></div></div></div>';

                                        $('.content > .container-fluid > .row').append(html);


                                        
                                    }
                                }
                                xhr.send();  

        };


