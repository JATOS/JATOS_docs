---
title: JATOS Results Archive (JRZIP)
slug: /JATOS-Results-Archive-JRZIP.html
sidebar_position: 4
---

:::info
This is **advanced knowledge** about JATOS. If you just want to use JATOS to run a study it is not necessary to read this.
:::

## Introduction

A JRZIP ("JATOS study results archive") is a file package format used to export results from JATOS instances. A JRZIP aggregates the results data, result files and associated metadata into one file for distribution. They are built on the ZIP format and have a _.jrzip_ file extension.


## JRZIP File system structure

A JRZIP file is organized by study results. Each study result folder (named _study_result_x_,  _x_ being the study result ID) contains the folders for the component results (named _comp_result_y_, _y_ being the component result ID) that belong to the components of the study. Each component result folder contains the uploaded result files in the _files_ folder and the result data in the _data.txt_ file.

```
/
├── study_result_1
│   ├── comp_result_1
│       ├── files
│       └── data.txt
│   ├── comp_result_2
│   ├── comp_result_2
│   └── ...
├── study_result_2
├── study_result_3
│   ...
└── metadata.json
```


## Metadata JSON Schema

```json
{
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "title": "Root",
    "required": [
        "apiVersion",
        "data"
    ],
    "properties": {
        "apiVersion": {
            "type": "string",
            "title": "The API version",
            "examples": [
                "1.0.0"
            ]
        },
        "data": {
            "type": "array",
            "title": "All data",
            "items": {
                "type": "object",
                "title": "Study IDs, title and results",
                "required": [
                    "studyId",
                    "studyUuid",
                    "studyTitle",
                    "studyResults"
                ],
                "properties": {
                    "studyId": {
                        "type": "integer",
                        "title": "Study ID"
                    },
                    "studyUuid": {
                        "type": "string",
                        "title": "Study UUID"
                    },
                    "studyTitle": {
                        "type": "string",
                        "title": "Study's title"
                    },
                    "studyResults": {
                        "type": "array",
                        "title": "List of study results",
                        "items": {
                            "type": "object",
                            "title": "Study result",
                            "description": "A study result contains one or multiple component results",
                            "required": [
                                "id",
                                "uuid",
                                "studyCode",
                                "startDate",
                                "endDate",
                                "duration",
                                "lastSeenDate",
                                "studyState",
                                "message",
                                "workerId",
                                "workerType",
                                "batchId",
                                "batchUuid",
                                "batchTitle",
                                "groupId",
                                "componentResults"
                            ],
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "title": "Study result ID"
                                },
                                "uuid": {
                                    "type": "string",
                                    "title": "Study result UUID"
                                },
                                "studyCode": {
                                    "type": "string",
                                    "title": "Study code"
                                },
                                "startDate": {
                                    "type": "integer",
                                    "title": "Epoch time of the start date"
                                },
                                "endDate": {
                                    "type": "integer",
                                    "title": "Epoch time of the end date"
                                },
                                "duration": {
                                    "type": "string",
                                    "title": "Study run duration in hh:mm:ss"
                                },
                                "lastSeenDate": {
                                    "type": "integer",
                                    "title": "Epoch time of the last seen date"
                                },
                                "studyState": {
                                    "type": "string",
                                    "title": "Study result state",
                                    "description": "One of: PRE (Preview of study - exists only in PersonalSingle GeneralSingle worker), STARTED (Study was started), DATA_RETRIEVED (Study's jsonData were retrieved), FINISHED (Study successfully finished), ABORTED (Study aborted by worker), FAIL (Something went wrong)"
                                },
                                "message": {
                                    "type": "string",
                                    "title": "Message from the study run"
                                },
                                "workerId": {
                                    "type": "integer",
                                    "title": "Worker ID"
                                },
                                "workerType": {
                                    "type": "string",
                                    "title": "Worker type",
                                    "description": "On of: GeneralMultiple, GeneralSingle, Jatos, MTSandbox, MT, PersonalMultiple, PersonalSingle"
                                },
                                "batchId": {
                                    "type": "integer",
                                    "title": "Batch ID"
                                },
                                "batchUuid": {
                                    "type": "string",
                                    "title": "Batch UUID"
                                },
                                "batchTitle": {
                                    "type": "string",
                                    "title": "Batch title"
                                },
                                "groupId": {
                                    "type": "string",
                                    "title": "Group ID"
                                },
                                "componentResults": {
                                    "type": "array",
                                    "title": "List of component results",
                                    "items": {
                                        "type": "object",
                                        "title": "component result",
                                        "required": [
                                            "id",
                                            "componentId",
                                            "componentUuid",
                                            "startDate",
                                            "endDate",
                                            "duration",
                                            "componentState",
                                            "path",
                                            "data",
                                            "files"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "integer",
                                                "title": "Component result ID"
                                            },
                                            "componentId": {
                                                "type": "integer",
                                                "title": "Component ID"
                                            },
                                            "componentUuid": {
                                                "type": "string",
                                                "title": "Component UUID"
                                            },
                                            "startDate": {
                                                "type": "integer",
                                                "title": "Epoch time of the start date"
                                            },
                                            "endDate": {
                                                "type": "integer",
                                                "title": "Epoch time of the end date"
                                            },
                                            "duration": {
                                                "type": "string",
                                                "title": "Component run duration in hh:mm:ss"
                                            },
                                            "componentState": {
                                                "type": "string",
                                                "title": "Component result state",
                                                "description": "One of: STARTED, DATA_RETRIEVED, FINISHED, RELOADED, ABORTED, FAIL (deprecated: RESULTDATA_POSTED)"
                                            },
                                            "path": {
                                                "type": "string",
                                                "title": "Path",
                                                "description": "Path to the component result folder in the archive"
                                            },
                                            "data": {
                                                "type": "object",
                                                "title": "Data properties",
                                                "description": "The actual result data are in an extra file called 'data.txt'",
                                                "required": [
                                                    "size",
                                                    "sizeHumanReadable"
                                                ],
                                                "properties": {
                                                    "size": {
                                                        "type": "integer",
                                                        "title": "Data size in byte"
                                                    },
                                                    "sizeHumanReadable": {
                                                        "type": "string",
                                                        "title": "Human readable data size"
                                                    }
                                                }
                                            },
                                            "files": {
                                                "type": "array",
                                                "title": "List of file properties",
                                                "items": {
                                                    "type": "object",
                                                    "title": "Properties of one file",
                                                    "required": [
                                                        "filename",
                                                        "size",
                                                        "sizeHumanReadable"
                                                    ],
                                                    "properties": {
                                                        "filename": {
                                                            "type": "string",
                                                            "title": "Filename"
                                                        },
                                                        "size": {
                                                            "type": "integer",
                                                            "title": "File size in byte"
                                                        },
                                                        "sizeHumanReadable": {
                                                            "type": "string",
                                                            "title": "Human readable file size"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```
