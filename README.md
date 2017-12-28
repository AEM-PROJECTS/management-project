# management-project

## Admin section
```json
{
    "adminconsole":  [
        {
            "section":"Admin",
            "name":"Sites",
            "subtitle":"Go to link",
            "url":"http://localhost:4502/sites.html/content",
            "icon":"info_outline"
        }
    ]
}
```


## Team section
```json
{
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
    ]
}
```   
   
## Query section
```json 
{
    "query": [
        {
             "url":"http://localhost:4502/bin/querybuilder.json?path=/apps&type=cq:Component&p.limit=-1&orderby:path"
        }, 
        {
            "url":"http://localhost:4502/bin/querybuilder.json?path=/apps/PROJECT_HERE/templates&type=cq:Template&p.limit=-1&orderby:path"
        }
    ]
}
```
