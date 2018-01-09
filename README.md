# management-project


## How to isntall
Donwload the project, open the browser(extensions tab) and select the folder with the project.
![Image how to install](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/isntall.png)

## Context menu
If you select a text, the plugin detect the node selected, find the parent node with a cq tag(the nearly component in the DOM) and open a new tab with the selected component or the page in the CRX when you don't selct nothing in the page.

### open page/component in crx
STEP1.Select the text that i wish need inspect the componente in the crx and use the plugin.
![Image of context_Menus](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/context_menus_1.png)


STEP 2.Open the CRX with the exacto or nearly component in the DOM.
![Image of context_Menus](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/context_menus_2.png)


### create package with page
STEP1.
![Image of context_Menus](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/download_page.png)


STEP2.The package is generated automatically with the page and resources.
![Image of context_Menus](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/download_page_2.png)


## Admin section
```json
{
    "adminconsole":  {
        "enviroments" : [
            {
                "name":"localhost",
                "url": "http://localhost:4502",
                "color": "green",
                "author":"http://localhost:4502",
                "publish": [
                    {
                        "url":"http://localhost:4503"
                    }
                ],
                "custom":[
                    {
                        "name":"blah blah",
                        "url": "https://blahblah.it"
                    }
                ]
            },
            {
                "name":"Produccion",
                "url": "https://blah_blah_publish.it",
                "color": "orange",
                "author":"https://blah_blah_publish.aem6.it",
                "publish": [
                    {
                        "url":"http://.....:4503"
                    },
                                        {
                        "url":"http://.....:4503"
                    },
                                        {
                        "url":"http://.......:4503"
                    },
                                        {
                        "url":"http://..........."
                    }
                ]
            }
            
        ],
        "links" : [
            {
                "section":"Admin",
                "name":"Sites",
                "subtitle":"Go to link",
                "url":"/sites.html/content",
                "icon":"info_outline"
            },
            {
                "section":"Content",
                "name":"Asets",
                "url":"/assets.html/content/dam",
                "icon":"store"
            }
        ]
    }
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

## Instance section
![Image of Instance section](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/monitor.png)


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
![Image of Query](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/query.PNG)
Each result with "path key" contains a redirect to obtain the list of page where the component is used.
![Image of Query](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/query2.PNG)


## HOW TO SET.

STEP 1.
![Image of setting](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/setting.png)

STEP 2.
[Example of json](https://github.com/AEM-PROJECTS/management-project/blob/master/documentation/data.json)
```json 
{
    "adminconsole":  {

        "enviroments" : [
            {
                "name":"localhost",
                "url": "http://localhost:4502",
                "color": "red",
                "author":"http://localhost:4502",
                "publish": [
                    {
                        "url":"http://localhost:4503"
                    }
                ],
            }
        ],
        "links" : [
            {
                "section":"Admin",
                "name":"Sites",
                "subtitle":"Go to link",
                "url":"/sites.html/content",
                "icon":"info_outline"
            },
            {
                "section":"Content",
                "name":"Asets",
                "url":"/assets.html/content/dam",
                "icon":"store"
            },
            {
                "section":"Admin",
                "name":"CRXDE Lite",
                "url":"/crx/de/index.jsp",
                "icon":"info_outline"
            },
            {
                "section":"Admin",
                "name":"Replication",
                "url":"/etc/replication.html",
                "icon":""
            },
            {
                "section":"Debug",
                "name":"Querydebug",
                "url":"/libs/cq/search/content/querydebug.html",
                "icon":""
            }
        ]


    },
    "team": [
        {
            "name":"my team",
            "url":"REDMINE SERVER HERE",
            "api_key":"&api_key=zzzzzzzzzzzzzzzzzzzzzzz",
            "tables":[
                {
                    "query":"/issues.xml?assigned_to_id=me"
                },
                {
                    "query":"/issues.xml?project_id=44"
                }
            ]
        }
    ],
    "logs":
        [],
    "query": [
        {
             "url":"/bin/querybuilder.json?path=/apps&type=cq:Component&p.limit=-1&orderby:path"
        }, 
        {
            "url":"/bin/querybuilder.json?path=/apps/project/templates&type=cq:Template&p.limit=-1&orderby:path"
        }
    ]

}
```
