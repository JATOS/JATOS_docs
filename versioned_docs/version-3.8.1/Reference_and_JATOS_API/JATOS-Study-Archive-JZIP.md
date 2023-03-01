---
title: JATOS Study Archive (JZIP)
slug: /JATOS-Study-Archive-JZIP.html
sidebar_position: 3
---

:::info
This is **advanced knowledge** about JATOS. If you just want to use JATOS to run a study it is not necessary to read this.
:::


## Introduction

A JZIP ("JATOS study archive") is a file package format used to exchange JATOS studies between different JATOS instances. A JZIP aggregates the study assets and associated metadata (study properties) into one file for distribution. They are built on the ZIP format and have a _.jzip_ file extension.

### JZIP File system structure

```
/
├── study assets directory (actual name is defined in the study properties)
│   ├── some asset file
│   ├── some asset file
│   └── ...
└── JAS file (containing the study properties in JSON format with a .jas file extension)
```

### Study assets directory

This is a copy of your study assets directory.

### JAS file schema

The JAS file contains the study properties in JSON format.

#### Example of a JAS file


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
        "jsonData": "{\"a\":\"test\",\"b\":5}",
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

#### JSON Schema of a JAS file

```json
{
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "title": "Root Schema",
    "required": [
        "version",
        "data"
    ],
    "properties": {
        "version": {
            "type": "string",
            "title": "Version of this study property schema"
        },
        "data": {
            "type": "object",
            "title": "Study properties",
            "required": [
                "uuid",
                "title",
                "dirName",
                "componentList"
            ],
            "properties": {
                "uuid": {
                    "type": "string",
                    "title": "Study UUID"
                },
                "title": {
                    "type": "string",
                    "title": "Title"
                },
                "description": {
                    "type": "string",
                    "title": "Description"
                },
                "groupStudy": {
                    "type": "boolean",
                    "default": false,
                    "title": "Group study flag"
                },
                "linearStudy": {
                    "type": "boolean",
                    "default": false,
                    "title": "Linear study flag"
                },
                "allowPreview": {
                    "type": "boolean",
                    "default": false,
                    "title": "Allow preview flag"
                },
                "dirName": {
                    "type": "string",
                    "title": "Study assets directory name"
                },
                "comments": {
                    "type": "string",
                    "title": "Comments"
                },
                "jsonData": {
                    "type": "string",
                    "title": "JSON data"
                },
                "endRedirectUrl": {
                    "type": "string",
                    "title": "End redirect URL"
                },
                "studyEntryMsg": {
                    "type": "string",
                    "title": "Study entry message"
                },
                "componentList": {
                    "type": "array",
                    "title": "List of components",
                    "items": {
                        "type": "object",
                        "title": "Component",
                        "required": [
                            "uuid",
                            "title",
                            "htmlFilePath"
                        ],
                        "properties": {
                            "uuid": {
                                "type": "string",
                                "title": "Component UUID"
                            },
                            "title": {
                                "type": "string",
                                "title": "Title"
                            },
                            "htmlFilePath": {
                                "type": "string",
                                "title": "HTML file path"
                            },
                            "reloadable": {
                                "type": "boolean",
                                "default": false,
                                "title": "Reloadable component flag"
                            },
                            "active": {
                                "type": "boolean",
                                "default": true,
                                "title": "Component active flag"
                            },
                            "comments": {
                                "type": "string",
                                "title": "Comments"
                            },
                            "jsonData": {
                                "type": "null",
                                "title": "JSON data"
                            }
                        }
                    }
                },
                "batchList": {
                    "type": "array",
                    "title": "List of batches",
                    "items": {
                        "type": "object",
                        "title": "Batch",
                        "required": [
                            "uuid",
                            "title",
                            "allowedWorkerTypes"
                        ],
                        "properties": {
                            "uuid": {
                                "type": "string",
                                "title": "Batch UUID"
                            },
                            "title": {
                                "type": "string",
                                "title": "Title"
                            },
                            "active": {
                                "type": "boolean",
                                "default": true,
                                "title": "Batch active flag"
                            },
                            "maxActiveMembers": {
                                "type": "integer",
                                "default": "null",
                                "title": "Max active members"
                            },
                            "maxTotalMembers": {
                                "type": "integer",
                                "default": "null",
                                "title": "Max total members"
                            },
                            "maxTotalWorkers": {
                                "type": "integer",
                                "default": "null",
                                "title": "Max total workers"
                            },
                            "allowedWorkerTypes": {
                                "type": "array",
                                "title": "Allowed worker types",
                                "description": "Possible items are: GeneralMultiple, GeneralSingle, Jatos, MTSandbox, MT, PersonalMultiple, PersonalSingle"
                                "items": {
                                    "type": "string",
                                    "title": "Worker type"
                                }
                            },
                            "comments": {
                                "type": "string",
                                "title": "Comments"
                            },
                            "jsonData": {
                                "type": "string",
                                "title": "JSON data"
                            }
                        }
                    }
                }
            }
        }
    }
}
```
