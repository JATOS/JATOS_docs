---
title: JATOS API
slug: /JATOS-API.html
sidebar_position: 2
---

## Introduction

* Personal Access Tokens, sometimes called PAT or API tokens - associated with a user
* No roles or scopes
* Only admin tokens (tokens associated to admin users) have access to all endpoints
* How to create token
* CORS (Cross-Origin Resource Sharing) settings in production.conf
* Deactivate API in production.conf

OpenAPI specification (in YAML): https://raw.githubusercontent.com/JATOS/JATOS/api_token/jatos-api.yaml

Try out with a JATOS (localhost or remote): http://petstore.swagger.io/?url=https://raw.githubusercontent.com/JATOS/JATOS/api_token/jatos-api.yaml

Still necessary? API docs with the possibility to try out the API with a public JATOS (do not allow localhost)
https://app.swaggerhub.com/apis-docs/JATOS/JATOS_API/0.1.2