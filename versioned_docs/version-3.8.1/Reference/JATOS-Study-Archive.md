---
title: JATOS Study Archive (.jzip)
slug: /JATOS-Study-Archive.html
sidebar_position: 3
---

## Introduction

JATOS exports studies as a JATOS study archive file with a _.jzip_ suffix. It is a ZIP archive that follows a certain format. If you just export and import studies you don't have to care for this format. But if you want to create a _.jzip_ file programmatically or manually you probably find this information helpful.

File system format
* study assets directoy
* _.jas_ file containing the study properties in JSON format


Example of a _.jas file:

```json
{
    "version": "3",
    "data": {
        "uuid": "537cfff1-de92-1d80-264c-6b589e82f6de",
        "title": "Simple Reaction Time Task",
        "description": "Here we descibe the study.",
        "groupStudy": false,
        "linearStudy": false,
        "allowPreview": false,
        "dirName": "simple_rt_task",
        "comments": "",
        "jsonData": null,
        "endRedirectUrl": "",
        "studyEntryMsg": null,
        "componentList": [
            {
                "uuid": "dea21111-a966-5b24-9f15-a89fefa3f711",
                "title": "Introduction and Consent",
                "htmlFilePath": "intro.html",
                "reloadable": true,
                "active": true,
                "comments": "",
                "jsonData": null
            },
            {
                "uuid": "970a92f0-b966-4b2f-bf15-b89fefa3f911",
                "title": "Experiment",
                "htmlFilePath": "experiment.html",
                "reloadable": false,
                "active": true,
                "comments": "",
                "jsonData": null
            }
        ],
        "batchList": [
            {
                "uuid": "9c7992ca-aa24-4081-8b0e-ee70f49cd65f",
                "title": "Default",
                "active": true,
                "maxActiveMembers": null,
                "maxTotalMembers": null,
                "maxTotalWorkers": null,
                "allowedWorkerTypes": [
                    "PersonalSingle",
                    "Jatos",
                    "PersonalMultiple"
                ],
                "comments": null,
                "jsonData": null
            }
        ]
    }
}
``` 

## JSON Schema of a _.jas_ file:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "version": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "uuid": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "groupStudy": {
          "type": "boolean"
        },
        "linearStudy": {
          "type": "boolean"
        },
        "allowPreview": {
          "type": "boolean"
        },
        "dirName": {
          "type": "string"
        },
        "comments": {
          "type": "string"
        },
        "jsonData": {
          "type": "null"
        },
        "endRedirectUrl": {
          "type": "string"
        },
        "studyEntryMsg": {
          "type": "null"
        },
        "componentList": {
          "type": "array",
          "items": [
            {
              "type": "object",
              "properties": {
                "uuid": {
                  "type": "string"
                },
                "title": {
                  "type": "string"
                },
                "htmlFilePath": {
                  "type": "string"
                },
                "reloadable": {
                  "type": "boolean"
                },
                "active": {
                  "type": "boolean"
                },
                "comments": {
                  "type": "string"
                },
                "jsonData": {
                  "type": "null"
                }
              },
              "required": [
                "uuid",
                "title",
                "htmlFilePath"
              ]
            }
          ]
        },
        "batchList": {
          "type": "array",
          "items": [
            {
              "type": "object",
              "properties": {
                "uuid": {
                  "type": "string"
                },
                "title": {
                  "type": "string"
                },
                "active": {
                  "type": "boolean"
                },
                "maxActiveMembers": {
                  "type": "null"
                },
                "maxTotalMembers": {
                  "type": "null"
                },
                "maxTotalWorkers": {
                  "type": "null"
                },
                "allowedWorkerTypes": {
                  "type": "array",
                  "items": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "comments": {
                  "type": "null"
                },
                "jsonData": {
                  "type": "null"
                }
              },
              "required": [
                "uuid",
                "title"
              ]
            }
          ]
        }
      },
      "required": [
        "uuid",
        "title",
        "dirName",
        "componentList",
        "batchList"
      ]
    }
  },
  "required": [
    "version",
    "data"
  ]
}
```
