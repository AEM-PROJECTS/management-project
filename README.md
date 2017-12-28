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
![Image of Admin console](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/admin.png)

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

![Image of Query](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/query.png)
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


![Image of context_Menus](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/context_menus_1.png)
![Image of context_Menus](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/context_menus_2.png)
