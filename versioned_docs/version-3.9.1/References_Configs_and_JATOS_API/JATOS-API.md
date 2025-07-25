---
title: JATOS API
slug: /JATOS-API.html
sidebar_position: 3
---

:::info
Using the JATOS API requires some **advanced knowledge** of HTTP and how to call APIs from a programming language or terminal. If you just want to run a study with JATOS, this is probably not what you need. Anything you can do programmatically with the API can also be done manually via JATOS' GUI.
:::

## Introduction

Since version 3.8.1, JATOS offers an HTTP API to make integrating JATOS into other tools easier. A common use case is calling JATOS directly from Python, R, Matlab, or any other programming language in an automated and programmatic fashion.

With the API, you can:

* **Import/export studies**
* Update your study by uploading, downloading, or deleting individual **study asset files**
* **Export results**
* Export **study/component properties**
* Get **study codes** (to build study links for distribution to participants)

## Try Out the API

You can try out the API with your local JATOS. Here's how:

1. [Generate a token](JATOS-API.html#how-to-generate-a-token) in your local JATOS. (The JATOS API uses _personal access tokens_ with _bearer authentication_.)
2. Copy your token.
3. Go to [petstore.swagger.io](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/JATOS/JATOS/main/jatos-api.yaml). You'll see all API endpoints and their descriptions.
4. At the top of the Swagger page, click the green 'Authorize' button. Paste your JATOS token into _Authorize_ → _Bearer Auth_. Don't forget to click _Authorize_.
5. Choose the server `http://localhost:9000` (probably already set).
6. Try it out! (Click on each link to try the corresponding endpoint with pre-loaded defaults.)

## OpenAPI Specification

The JATOS API uses [OpenAPI 3 for specification](https://github.com/JATOS/JATOS/blob/main/jatos-api.yaml). You can use [petstore.swagger.io](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/JATOS/JATOS/main/jatos-api.yaml) for an easy-to-navigate page.

The API is a work in progress. To request additional endpoints, please open a [GitHub issue](https://github.com/JATOS/JATOS/issues).

## Authentication

The JATOS API uses **bearer authentication**.

From [swagger.io](https://swagger.io/docs/specification/authentication/bearer-authentication/):

> Bearer authentication (also called token authentication) is an HTTP authentication scheme that involves security tokens called bearer tokens. The name "Bearer authentication" can be understood as "give access to the bearer of this token." The bearer token is a cryptic string, usually generated by the server in response to a login request. The client must send this token in the Authorization header when making requests to protected resources.

Every HTTP request to the API needs this header (replace `<token>` with your token):

```
Authorization: Bearer <token>
```

Example requests to the endpoint `/jatos/api/v1/admin/token` (returns info about the used token):

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```shell
curl -i -H "Authorization: Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f" https://example.com/jatos/api/v1/admin/token
```

</TabItem>
<TabItem value="py" label="Python">

```py
import requests

headers = {
    'Authorization': 'Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f',
}
response = requests.post('https://example.com/jatos/api/v1/admin/token', headers=headers)
```

</TabItem>
<TabItem value="r" label="R">

```r
require(httr)

headers = c(
  `Authorization` = "Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f"
)
res <- httr::GET(url = "https://example.com/jatos/api/v1/admin/token", httr::add_headers(.headers=headers))
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
fetch('https://example.com/jatos/api/v1/admin/token', {
  headers: {
    'Authorization': 'Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f'
  }
});
```

</TabItem>
<TabItem value="matlab" label="MATLAB">

```matlab
%% HTTP Interface
import matlab.net.*
import matlab.net.http.*

header = HeaderField('Authorization', 'Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f');
uri = URI('https://example.com/jatos/api/v1/admin/token');
response = RequestMessage('get', header).send(uri.EncodedURI);
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
$headers=@{}
$headers.Add("Authorization", "Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f")
$response = Invoke-WebRequest -Uri 'https://www.example.com/jatos/api/v1/admin/token' -Method GET -Headers $headers
```

</TabItem>
</Tabs>

## Personal Access Tokens

The JATOS API uses personal access tokens (PATs or API tokens).

From [Wikipedia](https://en.wikipedia.org/wiki/Personal_access_token):

> A personal access token (or PAT) is a string of characters that can be used to authenticate a user when accessing a computer system instead of the usual password. Though associated with a single account, multiple PATs may be added, and can be manipulated independently of the password associated with that account, including creation and revocation of PATs without altering the password.

Unlike other systems (e.g., GitHub), JATOS tokens have no roles or scopes. A token has the same access as the user it is associated with. Therefore, a token can only be used to access studies or result data if the associated user is a member of that study. Only _admin tokens_ (tokens associated with an admin user) can access the administration endpoints.

### How to Generate a Token

1. Go to the user menu (click your name in the top-right header).
2. Click the button _My API tokens_.
3. In the pop-up window, click _New Token_. Choose a descriptive _name_ (doesn't have to be unique) and select the expiration period. Click _Generate_.
4. Your token will be shown. **Copy it to a safe place**—it will never be shown again.
5. In the token overview window, you can temporarily deactivate or delete a token.

![API token 1](/img/v39x/api_tokens_1.png)
![API token 2](/img/v39x/api_tokens_2.png)
![API token 3](/img/v39x/api_tokens_3.png)
![API token 4](/img/v39x/api_tokens_4.png)

## How to Import a Study

The endpoint to import a study, `/jatos/api/v1/study`, uses a POST request with the header `Content-Type: multipart/form-data` to upload a study archive file (JZIP) in binary format.

Here are examples in different tools/languages for uploading a JZIP file named `test.jzip`:

<Tabs>
<TabItem value="curl" label="curl">

```shell
curl -X 'POST' 'https://example.com/jatos/api/v1/study' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f' \
  -H 'Content-Type: multipart/form-data' \
  -F 'study=@test.jzip'
```

</TabItem>
<TabItem value="py" label="Python">

```py
import requests

headers = {
    'accept': 'application/json',
    'Authorization': 'Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f',
    # requests will set the correct boundary automatically
}

files = {
    'study': open('test.jzip', 'rb'),
}

response = requests.post('https://example.com/jatos/api/v1/study', headers=headers, files=files)
```

</TabItem>
<TabItem value="r" label="R">

```r
require(httr)

headers = c(
  `Authorization` = "Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f"
)
res <- httr::POST(
  url = "https://example.com/jatos/api/v1/study",
  add_headers(.headers = headers),
  body = list(study = upload_file("test.jzip"))
)
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const form = new FormData();
form.append('study', File(['<data goes here>'], 'test.jzip'));

fetch('https://example.com/jatos/api/v1/study', {
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'Authorization': 'Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f'
    // Do not set Content-Type; the browser will set it with the correct boundary
  },
  body: form
});
```

</TabItem>
<TabItem value="matlab" label="MATLAB">

```matlab
%% HTTP Interface
import matlab.net.*
import matlab.net.http.*
import matlab.net.http.io.*

header = [
    field.AcceptField(MediaType('application/json'))
    HeaderField('Authorization', 'Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f')
];
uri = URI('https://example.com/jatos/api/v1/study');
body = MultipartFormProvider('study', FileProvider('test.jzip'));
response = RequestMessage('post', header, body).send(uri.EncodedURI);
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("Authorization", "Bearer jap_OeYwru727YeLzxcHSvIFlTQ52Ud03wo7cd41f")
$form = @{
    study = Get-Item "test.jzip"
}
$response = Invoke-WebRequest -Uri 'https://example.com/jatos/api/v1/study' -Method POST -Headers $headers -Form $form
```

</TabItem>
</Tabs>

## Deactivate the JATOS API

By default, the API is activated and ready to use. If you want to turn it off, edit `conf/jatos.conf` (or `conf/production.conf` in versions < 3.8.3) in the JATOS installation folder. Search for `jatos.api.allowed` and set it to `false`:

```
jatos.api.allowed = false
```
