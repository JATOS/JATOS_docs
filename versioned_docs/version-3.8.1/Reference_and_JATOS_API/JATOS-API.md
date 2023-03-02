---
title: JATOS API
slug: /JATOS-API.html
sidebar_position: 2
---

:::info
Using the JATOS API requires some **advanced knowledge** of HTTP and how to call APIs from e.g. a programming language or a terminal. If you just want to run a study with JATOS this is probably not what you need. Anything that you can do (programmatially) with the API can also be done (by hand) with JATOS' GUI.
:::

## Introduction

Since version 3.8.1 JATOS offers an (HTTP) API to make integrating JATOS into other tools easier. One common usage of the API is to call JATOS directly from Python, R, Matlab (or any other programming language) in an automated and programatic fashion. 

Things that are possible with the API:

* **Import/export studies** 
* Update your study by uploading/downloading/deleting single **study assets files**
* **Export results**
* Export **study/componnent properties**
* Get **study codes** (to build study links that can be distributed to participants)


## Have a look and try it out
You can even try out the API with your local JATOS. Here's how:
1. [Generate a token](JATOS-API.html#how-to-generate-a-token) in your local JATOS. (The JATOS API uses _personal access tokens_ with _bearer authentication_.)
1. Copy your token
1. Go to [petstore.swagger.io](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/JATOS/JATOS/api_token/jatos-api.yaml). You'll see all API endpoints and their descriptions. 
1. At the top of the Swagger page, you'll find a green 'Authorize' button. Paste the JATOS token into _Authorize_ -> _Bearer Auth_. Don't forget to click on _Authorize_.
1.  Choose the server `http://localhost:9000` (probably already set)
1. Try it out! (Click on each link to try the corresponding endpoint with pre-loaded defaults)

## OpenAPI specification

The JATOS API uses [OpenAPI 3 for specification](https://github.com/JATOS/JATOS/blob/master/jatos-api.yaml). You can use [petstore.swagger.io](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/JATOS/JATOS/api_token/jatos-api.yaml) to have an easy navigatable page.

The API is work in progress (this is the first version). To request any additional endpoints, please write a [GitHub issue](https://github.com/JATOS/JATOS/issues).


## Authentication

The JATOS API uses **bearer authentication**. It's pretty simple.

From [swagger.io](https://swagger.io/docs/specification/authentication/bearer-authentication/):

> Bearer authentication (also called token authentication) is an HTTP authentication scheme that involves security tokens called bearer tokens. The name "Bearer authentication" can be understood as "give access to the bearer of this token." The bearer token is a cryptic string, usually generated by the server in response to a login request. The client must send this token in the Authorization header when making requests to protected resources. 

Every HTTP request to the API needs this header (replace `<token>` with your token):

```
Authorization: Bearer <token>
```

So a command-line request with `curl` could look like:

```bash
curl -i -H "Authorization: Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f" https://www.example.com/jatos/api/v1/admin/token
```

## Personal access tokens

The JATOS API uses personal access tokens (PATs or API tokens).

From [wikipedia](https://en.wikipedia.org/wiki/Personal_access_token):

> a personal access token (or PAT) is a string of characters that can be used to authenticate a user when accessing a computer system instead of the usual password. Though associated with a single account, multiple PATs may be created, and can be manipulated independently of the password associated with that account, including creation and revocation of PATs without altering the password.

Unlike other systems (e.g. GitHub) JATOS' tokens have no roles or scopes. A token has the same access as the user they are associated with. Therefore, naturally, a token can only be used to access studies or their result data if the associated user is a member of this study. Only _admin tokens_ (tokens associated with an admin user) can access the administration endpoints.

### How to generate a token

Go to your user's page (click on your name in the top-right header). Then click the button _API Tokens_.

![API token 1](/img/api_tokens_1.png)

In the pop-up window click the button _New Token". Then choose a descriptive _name_ (doesn't have to be unique). Choose the time period when the token is about to expire. Click _Generate_.

![API token 1](/img/api_tokens_2.png)

Now your token will be shown. **Copy it to a safe place**. **It will never be shown to you again**.

![API token 1](/img/api_tokens_3.png)

In the token overview windows you can temporarily deactivate a token or delete it altogether.

![API token 1](/img/api_tokens_4.png)


## Deactivate the JATOS API

By default the API is activated and ready to use. If, for whatever reasons, you want to turn it off, edit the _conf/production.conf_ file in the JATOS installation folder. Search for `jatos.api.allowed` and remove the `#`:

```
jatos.api.allowed = false
```