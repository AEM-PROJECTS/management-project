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
![Image of Admin console 2](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/admin2.png)

## Team section
```json
{
    "team": [
        {
            "name":"my team",
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
![Image of Team](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/team.png)

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
![Image of Query](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/query.png)


## Context menu
If you select a text, the plugin detect the node selected, find the parent node with a cq tag(the nearly component in the DOM) and open a new tab with the selected component or the page in the CRX when you don't selct nothing in the page.


STEP1.

Select the text that i wish need inspect the componente in the crx and use the plugin.
![Image of context_Menus](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/context_menus_1.png)


STEP 2.

Open the CRX with the exacto or nearly component in the DOM.
![Image of context_Menus](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/context_menus_2.png)


[Example file data.json](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/data.json)
