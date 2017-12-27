# management-project

{
    "adminconsole":  [
        {
            "section":"Admin",
            "name":"Sites",
            "subtitle":"Go to link",
            "url":"http://localhost:4502/sites.html/content",
            "icon":"info_outline"
        },
        {
            "section":"Content",
            "name":"Asets",
            "url":"http://localhost:4502/assets.html/content/dam",
            "icon":"store"
        },
        {
            "section":"Admin",
            "name":"CRXDE Lite",
            "url":"http://localhost:4502/crx/de/index.jsp",
            "icon":"info_outline"
        },
        {
            "section":"Admin",
            "name":"Replication",
            "url":"http://localhost:4502/etc/replication.html",
            "icon":""
        },
        {
            "section":"Debug",
            "name":"Querydebug",
            "url":"http://localhost:4502/libs/cq/search/content/querydebug.html",
            "icon":""
        }
    ],
    "team": [
        {
            "name":"enel",
            "url":"https://SERVER_HERE/redmine",
            "api_key":"&api_key=VALUE_HERE",
            "tables":[
                {
                    "query":"/issues.xml?assigned_to_id=me"
                },
                {
                    "query":"/issues.xml?project_id=VALUE_HERE"
                }
            ]
        }
    ],
    "logs":
        [],
    "query": [
        {
             "url":"http://localhost:4502/bin/querybuilder.json?path=/apps&type=cq:Component&p.limit=-1&orderby:path"
        }, 
        {
            "url":"http://localhost:4502/bin/querybuilder.json?path=/apps/PROJECT_HERE/templates&type=cq:Template&p.limit=-1&orderby:path"
        }
    ]

}
