---
title: JATOS Study Archive (JZIP)
slug: /JATOS-Study-Archive-JZIP.html
sidebar_position: 3
---

:::info
This is **advanced knowledge** about JATOS. If you just want to use JATOS to run a study it is not necessary to read this.
:::


## Introduction

A JZIP ("JATOS study archive") file is the file format JATOS uses exchange studies between different JATOS instances. A JZIP aggregates the study assets and associated metadata (study properties) into one file for distribution. They are built on the ZIP format and typically have a _.jzip_ file extension.

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
