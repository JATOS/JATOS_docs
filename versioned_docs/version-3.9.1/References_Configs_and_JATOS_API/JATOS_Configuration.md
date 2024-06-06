---
title: JATOS Configuration
slug: /JATOS_Configuration.html
sidebar_position: 2
---

JATOS' properties can be configured in three different ways:

1. via a **config file** (named _jatos.conf_ or _production.conf_)
1. via **command-line** arguments 
1. via **environment** variables (possible for only a few of the properties)

The config file is located in the JATOS folder under _./conf_ and is named _jatos.conf_ for versions >= 3.8.3 and _production.conf_ for versions < 3.8.3. It uses the [HOCON format](https://github.com/lightbend/config/blob/main/HOCON.md). **Remember to always restart JATOS after making any changes to a config file.**

Command-line argument names are usually the same as the names in the config file except that they are prefixed with `-D` (except JVM arguments that have a `-J`), e.g. `jatos.urlBasePath` and `-Djatos.urlBasePath`.

Command-line arguments can be appended to JATOS' `loader.sh start` command. E.g., here is the command with the two arguments `-Djatos.urlBasePath` and `-Djatos.tmpPath`:

   ~~~shell
   ./loader.sh start -Djatos.urlBasePath="/mybasepath/" -Djatos.tmpPath="/my/tmp/dir"
   ~~~


## JVM arguments

JVM arguments (arguments for the Java Virtual Machine) are special since they are not directly intended for JATOS but for the JVM running JATOS. They can **only be specified via command line arguments** and have to be prefixed with `-J`.

One commonly used JVM argument is `-Xmx`. It limits JATOS's memory usage (JVM's maximum heap memory usage to be precise). It has to be written as `-J-Xmx`, e.g. to allow 4GB memory `-J-Xmx4G`.

## HTTP config

### Address and port

By default JATOS binds to all locally available IP addresses including 127.0.0.1 on port 9000. Usually JATOS is installed together with a reverse proxy (e.g Nginx or Apache) but if you don't want to use a proxy, you have to set up the hostname or IP address and the port in one of the ways.

1. Via **config file** properties

   * **For v3.8.1 and lower)** `play.server.http.address` and `play.server.http.port`
   * **For v3.8.2 and higher)** `jatos.http.address` and `jatos.http.port`

   Example:

   ~~~shell
   jatos.http.address = 1.2.3.4
   jatos.http.port = 80
   ~~~

1. Via **command-line** arguments

   * **For v3.8.1 and lower)** `-Dplay.server.http.address` and `-Dplay.server.http.port`
   * **For v3.8.2 and higher)** `-Djatos.http.address` and `-Djatos.http.port`

   Example:

   ~~~shell
   -Djatos.http.address=1.2.3.4 -Djatos.http.port=80
   ~~~


### Server idle timeout

The idle timeout for an open connection after which it will be closed. Set to `null` or `infinite` to disable the timeout, but notice that this is not encouraged since timeouts are important mechanisms to protect your servers from malicious attacks or programming mistakes. Default is 75 seconds.

1. Via **config file** property `play.server.http.idleTimeout`

   Example:

   ~~~shell
   play.server.http.idleTimeout = 100s
   ~~~

1. Via **command-line** argument `-Dplay.server.http.idleTimeout`

   Example:

   ~~~shell
   -Dplay.server.http.idleTimeout=100s
   ~~~


### Request timeout

How long can a request take until it times out. Set to `null` or `infinite` to disable the timeout. Default is `infinite`.

1. Via **config file** property `play.server.akka.requestTimeout`

   Example:

   ~~~shell
   play.server.akka.requestTimeout = 100s
   ~~~

1. Via **command-line** argument `-Dplay.server.akka.requestTimeout`

   Example:

   ~~~shell
   -Dplay.server.akka.requestTimeout=100s
   ~~~


### URL base path

JATOS can be configured to use an base path. E.g we have the host _www\.example\.org_ and let JATOS run under _mybasepath_ so that all URLs start with _www\.example\.org/mybasepath/_.

**The path always has to start and end with a "/".** And keep in mind that if you add a base path to JATOS' URL you have to adjust all absolute paths to the study assets (in HTML and JavaScript files) too - [or use relative paths](Adapt-pre-written-code-to-run-it-in-JATOS.html#create-the-study-in-jatos) (which is recommended anyway).

1. Via **config file** properties

   * **For v3.8.1 and lower)** `play.http.context`
   * **For v3.8.2 and higher)** `jatos.urlBasePath`

   Example:

   ~~~shell
   jatos.urlBasePath = "/mybasepath/"
   ~~~

1. Via **command-line** arguments

   * **For v3.8.1 and lower)** `-Dplay.http.context`
   * **For v3.8.2 and higher)** `-Djatos.urlBasePath`

   ~~~shell
   -Djatos.urlBasePath="/mybasepath/"
   ~~~
   
1. Via **environment** variable `JATOS_URL_BASE_PATH`

   ~~~shell
   JATOS_URL_BASE_PATH="/mybasepath/"
   ~~~


### X-Frame-Options header

The [X-Frame-Options header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) can be used to allow or disallow embedding a JATOS study in an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) (or similar embedding techniques). Possible values are `DENY` (completely disallow iframes), `SAMEORIGIN` (embedding page has the same origin as the iframe), or `null` (allow iframes everywhere). By default it set to `SAMEORIGIN`.

1. Via **config file** property `play.filters.headers.frameOptions`

   Example:

   ~~~shell
   play.filters.headers.frameOptions = null
   ~~~

1. Via **command-line** argument `-Dplay.filters.headers.frameOptions`

   Example:

   ~~~shell
   -Dplay.filters.headers.frameOptions=null
   ~~~


## Trusted certificates

It's possible to add multiple certificates, e.g. for for encrypted LDAP. _type_ can be `PKCS12`, `JKS` or `PEM`.

1. Only via **config file** property `play.ws.ssl.trustManager.stores`

   ~~~shell
   play.ws.ssl.trustManager.stores = [ { type = "PEM", path = "conf/certs/ca.pem" } ]
   ~~~


## Study assets root path

The study assets root folder is the location where all study's HTML, JavaScript files etc. are stored. By default it is located in the JATOS folder and has the default name _study_assets_root_, except when JATOS runs in a Docker container, where it is under _/opt/jatos_data/study_assets_root"_ 

1. Via **config file** property `jatos.studyAssetsRootPath`

   ~~~shell
   jatos.studyAssetsRootPath = "/path/to/my/assets/root/folder"
   ~~~

1. Via **command-line** argument `-Djatos.studyAssetsRootPath`

   ~~~shell
   -Djatos.studyAssetsRootPath="/path/to/my/assets/root/folder"
   ~~~

1. Via **environment** variable `JATOS_STUDY_ASSETS_ROOT_PATH`

   ~~~shell
   JATOS_STUDY_ASSETS_ROOT_PATH="/path/to/my/assets/root/folder"
   ~~~


## Temporary directory path

(Only in version >= 3.8.3)

JATOS uses a directory to temporarily store files, e.g. during study import. By default the system's temporary directory is used (on Linux/Unix _/tmp_ or on Windows _c:\temp_), except when JATOS runs in a Docker container, when it is under _/opt/jatos_data/tmp_.

1. Via **config file** property `jatos.tmpPath`

   ~~~shell
   jatos.tmpPath = "/my/tmp/dir"
   ~~~

1. Via **command-line** argument `-Djatos.tmpPath`

   ~~~shell
   -Djatos.tmpPath="/my/tmp/dir"
   ~~~   

1. Via **environment** variable `JATOS_TMP_PATH`

   ~~~shell
   JATOS_TMP_PATH="/my/tmp/dir"
   ~~~


## Application logs

The application log records messages from the JATOS application. The application logs use a daily log rotation with a history of maximal 30 days.

Don't confuse the application logs with the [study logs](#study-logs). 

### Application logs path

The application logs are by default in the JATOS folder under _./logs_.

1. Via **config file** property `jatos.logs.path`

   ~~~shell
   jatos.logs.path = "/my/dir/logs"
   ~~~

1. Via **command-line** argument `-Djatos.logs.path`

   ~~~shell
   -Djatos.logs.path="/my/dir/logs"
   ~~~   

1. Via **environment** variable `JATOS_LOGS_PATH`

   ~~~shell
   JATOS_LOGS_PATH="/my/dir/logs"
   ~~~

### Application logs filename

By default the logs filename is _application_ (without suffix).

1. Via **config file** property `jatos.logs.filename`

   ~~~shell
   jatos.logs.filename = "myFilename"
   ~~~

1. Via **command-line** argument `-Djatos.logs.filename`

   ~~~shell
   -Djatos.logs.filename="myFilename"
   ~~~   

1. Via **environment** variable `JATOS_LOGS_FILENAME`

   ~~~shell
   JATOS_LOGS_FILENAME="myFilename"
   ~~~

### Application logs appender

The logs appender can be either `ASYNCSTDOUT` or `ASYNCFILE`. Default is `ASYNCFILE`. If you don't want to record the logs to a file but to _stdout_, change the value to `ASYNCSTDOUT`.

1. Via **config file** property `jatos.logs.appender`

   ~~~shell
   jatos.logs.appender = ASYNCSTDOUT
   ~~~

1. Via **command-line** argument `-Djatos.logs.appender`

   ~~~shell
   -Djatos.logs.appender=ASYNCSTDOUT
   ~~~   

1. Via **environment** variable `JATOS_LOGS_APPENDER`

   ~~~shell
   JATOS_LOGS_APPENDER=ASYNCSTDOUT
   ~~~


## Study logs

Every study stored in JATOS has its own study log ([more info](/Study-Log.html)). Among other things, it calculates hashes of result data, which can be CPU-intensive, and on smaller machines it can be better to disable it.

Don't confuse the study logs with the [application logs](#application-logs). .

### Enable/disable study logging

By default study logging is enabled.

1. Via **config file** property `jatos.studyLogs.enabled`

   ~~~shell
   jatos.studyLogs.enabled = false
   ~~~

1. Via **command-line** argument `-Djatos.studyLogs.enabled`

   ~~~shell
   -Djatos.studyLogs.enabled=false
   ~~~   

### Path to study logs

By default the study logs are stored in the JATOS folder under _./study_logs_. 

1. Via **config file** property `jatos.studyLogs.path`

   ~~~shell
   jatos.studyLogs.path = "/path/to/my/jatos_study_logs"
   ~~~

1. Via **command-line** argument `-Djatos.studyLogs.path`

   ~~~shell
   -Djatos.studyLogs.path="/path/to/my/jatos_study_logs"
   ~~~   

1. Via **environment** variable `JATOS_STUDY_LOGS_PATH`

   ~~~shell
   JATOS_STUDY_LOGS_PATH="/path/to/my/jatos_study_logs"
   ~~~


## Study members

Allow all users that exist on a JATOS to be added at once as members of a study. Can be useful in small setups, e.g. for a lab installation. Default is `false`.

1. Via **config file** property `jatos.studyMembers.allowAddAllUsers`

   ~~~shell
   jatos.studyMembers.allowAddAllUsers = true
   ~~~

1. Via **command-line** argument `-Djatos.studyMembers.allowAddAllUsers`

   ~~~shell
   -Djatos.studyMembers.allowAddAllUsers=true
   ~~~   


## Results pagination

Maximal number of results to be fetched from the DB at once. Default is 10.

1. Via **config file** property `jatos.maxResultsDbQuerySize`

   ~~~shell
   jatos.maxResultsDbQuerySize = 5
   ~~~

1. Via **command-line** argument `-Djatos.maxResultsDbQuerySize`

   ~~~shell
   -Djatos.maxResultsDbQuerySize=5
   ~~~   


## Result data

Maximum size of the result data of one component run. Default is 5MB.

1. Via **config file** property `jatos.resultData.maxSize`

   ~~~shell
   jatos.resultData.maxSize = 10MB
   ~~~

1. Via **command-line** argument `-Djatos.resultData.maxSize`

   ~~~shell
   -Djatos.resultData.maxSize=10MB
   ~~~   


## Result file uploading

During study runs it is possible to upload files to JATOS usually with results. This is an alternative to result data that are stored in the database. It is also possible to download previously uploaded files during a study run.

### Enable/disable result file uploading

Default is `true` (enabled).

1. Via **config file** property `jatos.resultUploads.enabled`

   ~~~shell
   jatos.resultUploads.enabled = false
   ~~~

1. Via **command-line** argument `-Djatos.resultUploads.enabled`

   ~~~shell
   -Djatos.resultUploads.enabled=false
   ~~~   

### Path to result files

The path where JATOS stores the uploaded result files from study runs. By default they are stored in the JATOS folder under _./result_uploads_.

1. Via **config file** property `jatos.resultUploads.path`

   ~~~shell
   jatos.resultUploads.path = "/path/to/my/jatos_result_uploads"
   ~~~

1. Via **command-line** argument `-Djatos.resultUploads.path`

   ~~~shell
   -Djatos.resultUploads.path="/path/to/my/jatos_result_uploads"
   ~~~   

1. Via **environment** variable `JATOS_RESULT_UPLOADS_PATH`

   ~~~shell
   JATOS_RESULT_UPLOADS_PATH="/path/to/my/jatos_result_uploads"
   ~~~

### Max file size

Specifies the maximum file size per uploaded file. Default is 30MB.

1. Via **config file** property `jatos.resultUploads.maxFileSize`

   ~~~shell
   jatos.resultUploads.maxFileSize = 100MB
   ~~~

1. Via **command-line** argument `-Djatos.resultUploads.maxFileSize`

   ~~~shell
   -Djatos.resultUploads.maxFileSize=100MB
   ~~~

1. Via **environment** variable `JATOS_RESULT_UPLOADS_MAX_FILE_SIZE`

   ~~~shell
   JATOS_RESULT_UPLOADS_MAX_FILE_SIZE=100MB
   ~~~

### All files size limit per study run

Specifies the maximum file size of all files together that are uploaded during one study run. Default is 50MB.

1. Via **config file** property `jatos.resultUploads.limitPerStudyRun`

   ~~~shell
   jatos.resultUploads.limitPerStudyRun = 100MB
   ~~~

1. Via **command-line** argument `-Djatos.resultUploads.limitPerStudyRun`

   ~~~shell
   -Djatos.resultUploads.limitPerStudyRun=100MB
   ~~~

1. Via **environment** variable `JATOS_RESULT_UPLOADS_LIMIT_PER_STUDY_RUN`

   ~~~shell
   JATOS_RESULT_UPLOADS_LIMIT_PER_STUDY_RUN=100MB
   ~~~


## Superuser

The _Superuser_ role can be granted to a user and it allows this user to **access ANY study** on this JATOS as if they were a member of this study. This **includes accessing the result data and even deleting the study itself**. This can be useful in small setups, e.g. for a lab installation or if there is a dedicated person responsible for running online studies. Default is `false`.

If set to `true` an user with the Admin role can grant the role Superuser to any user.

1. Via **config file** property `jatos.user.role.allowSuperuser`

   ~~~shell
   jatos.user.role.allowSuperuser = true
   ~~~

1. Via **command-line** argument `-Djatos.user.role.allowSuperuser`

   ~~~shell
   -Djatos.user.role.allowSuperuser=true
   ~~~


## LDAP authentication

At the moment LDAP users still have to be created manually in JATOS' _User manager_ (with the switch LDAP turned on). Only the authentication is done via LDAP.

If your LDAP server uses encryption, you have to add your certificate to JATOS' trusted certificates defined with `play.ws.ssl.trustManager.stores` (only possible in a config file). E.g., if your certificate's location is in `/jatos/conf/certs/ca.pem`, then use the following to add it:

```
play.ws.ssl.trustManager.stores = [
    { type = "PEM", path = "/jatos/conf/certs/ca.pem" }
    { path: ${java.home}/lib/security/cacerts, password = "changeit" }
]
```

The first line adds your certificate (_type_ can be `PKCS12`, `JKS` or `PEM`). The second line adds Java's default key store. Its default password is "changeit" ([don't change it](https://stackoverflow.com/a/32371148/1278769)).


### LDAP URL

Specifies URL of the LDAP server. Not set or an empty string disables authentication via LDAP. Default is empty (`""`).

1. Via **config file** property `jatos.user.authentication.ldap.url`

   ~~~shell
   jatos.user.authentication.ldap.url = "ldap://my.ldap.org:389"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.ldap.url`

   ~~~shell
   -Djatos.user.authentication.ldap.url="ldap://my.ldap.org:389"
   ~~~

### LDAP base DN

Specifies the base DN (distinguished name). It can be one DN with a single string (e.g. `"ou=students,dc=example,dc=com"`) or a list of DNs in squared brackets (e.g. `["ou=students,dc=example,dc=com", "ou=scientists,dc=example,dc=com"]`). Not set or an empty string disables authentication via LDAP. Default is empty (`""`).

1. Via **config file** property `jatos.user.authentication.ldap.basedn`

   ~~~shell
   jatos.user.authentication.ldap.basedn = "dc=example,dc=com"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.ldap.basedn`

   ~~~shell
   -Djatos.user.authentication.ldap.basedn="dc=example,dc=com"
   ~~~

### LDAP admin DN and password

Specifies an DN (distinguished name) and password of an (optional) admin user that has the right to search for other users. Some LDAP servers need this, if it is impossible to bind directly to an _uid_. Not set or an empty string means no admin user is needed. Default is empty (`""`).

1. Via **config file** properties `jatos.user.authentication.ldap.admin.dn` and `jatos.user.authentication.ldap.admin.password`

   ~~~shell
   jatos.user.authentication.ldap.admin.dn = "cn=read-only-admin,dc=example,dc=com"
   jatos.user.authentication.ldap.admin.password = "mypassword"
   ~~~

1. Via **command-line** arguments `-Djatos.user.authentication.ldap.admin.dn` and `-Djatos.user.authentication.ldap.admin.password`

   ~~~shell
   -Djatos.user.authentication.ldap.admin.dn="cn=read-only-admin,dc=example,dc=com"
   -Djatos.user.authentication.ldap.admin.password="mypassword"
   ~~~

### LDAP timeout

Time in milliseconds JATOS waits for a response from your LDAP server. Default is 5000 ms.

1. Via **config file** property `jatos.user.authentication.ldap.timeout`

   ~~~shell
   jatos.user.authentication.ldap.timeout = 10000
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.ldap.timeout`

   ~~~shell
   -Djatos.user.authentication.ldap.timeout=10000
   ~~~


## Google Sign-In

JATOS users can be authenticated by Google Sign-in. Not set or an empty string disables authentication via Google Sign-In. Default is empty (`""`).

Specifies the [Google API client ID](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid).

1. Via **config file** property `jatos.user.authentication.oauth.googleClientId`

   ~~~shell
   jatos.user.authentication.oauth.googleClientId = "1234567890-abc123abc123.apps.googleusercontent.com"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.oauth.googleClientId`

   ~~~shell
   -Djatos.user.authentication.oauth.googleClientId="1234567890-abc123abc123.apps.googleusercontent.com"
   ~~~


## OpenID Connect (OIDC) authentication

(Only in version >= 3.8.5)

JATOS users can be authenticated by [OIDC sign-in](https://openid.net/developers/how-connect-works/).

### OIDC discovery URL

Specifies the OIDC provider's discovery URL. It usually ends in _.well-known/openid-configuration_.

1. Via **config file** property `jatos.user.authentication.oidc.discoveryUrl`

   ~~~shell
   jatos.user.authentication.oidc.discoveryUrl = "http://myOidcProvider/.well-known/openid-configuration"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.oidc.discoveryUrl`

   ~~~shell
   -Djatos.user.authentication.oidc.discoveryUrl="http://myOidcProvider/.well-known/openid-configuration"
   ~~~

### OIDC client ID

Specifies the OIDC client ID. Not set or an empty string disables authentication via OIDC Sign-In. Default is empty (`""`).

1. Via **config file** property `jatos.user.authentication.oidc.clientId`

   ~~~shell
   jatos.user.authentication.oidc.clientId = "myClientId"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.oidc.clientId`

   ~~~shell
   -Djatos.user.authentication.oidc.clientId="myClientId"
   ~~~

### OIDC client secret

Specifies the OIDC client secret. This is optional and can be left empty (`""`).

1. Via **config file** property `jatos.user.authentication.oidc.clientSecret`

   ~~~shell
   jatos.user.authentication.oidc.clientSecret = "myClientSecret"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.oidc.clientSecret`

   ~~~shell
   -Djatos.user.authentication.oidc.clientSecret="myClientSecret"
   ~~~

### OIDC ID token signing algorithm

Specifies the OIDC ID token signing algorithm. Default is `RS256`.

1. Via **config file** property `jatos.user.authentication.oidc.idTokenSigningAlgorithm`

   ~~~shell
   jatos.user.authentication.oidc.idTokenSigningAlgorithm = "ES512"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.oidc.idTokenSigningAlgorithm`

   ~~~shell
   -Djatos.user.authentication.oidc.idTokenSigningAlgorithm="ES512"
   ~~~

### OIDC sign-in button text

Specifies the text of the OIDC sign-in button on the login page. Default is `Sign in with OIDC`.

1. Via **config file** property `jatos.user.authentication.oidc.signInButtonText`

   ~~~shell
   jatos.user.authentication.oidc.signInButtonText = "Sign in with ABC university"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.oidc.signInButtonText`

   ~~~shell
   -Djatos.user.authentication.oidc.signInButtonText="Sign in with ABC university"
   ~~~

### OIDC sign-in button logo

Specifies the URL of a logo that can be used instead of the standard OIDC logo, e.g. a university logo. Default is the OIDC logo.

1. Via **config file** property `jatos.user.authentication.oidc.signInButtonLogoUrl`

   ~~~shell
   jatos.user.authentication.oidc.signInButtonLogoUrl = "http://somedomain/logo.svg"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.oidc.signInButtonLogoUrl`

   ~~~shell
   -Djatos.user.authentication.oidc.signInButtonLogoUrl="http://somedomain/logo.svg"
   ~~~

### OIDC success feedback

Specifies the text of a message that is shown after a successful sign-in. If left empty (`""`) no message is shown. Default is `""`.

1. Via **config file** property `jatos.user.authentication.oidc.successFeedback`

   ~~~shell
   jatos.user.authentication.oidc.successFeedback = "You successfully signed in with ABC university"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.oidc.successFeedback`

   ~~~shell
   -Djatos.user.authentication.oidc.successFeedback="You successfully signed in with ABC university"
   ~~~


## ORCID (orcid.org) authentication

(Only in version >= 3.8.5)

JATOS users can be authenticated by [ORCID sign-in](https://info.orcid.org/documentation/features/public-api/orcid-as-a-sign-in-option-to-your-system/). Internally ORCID uses OpenId Connect.

### ORCID client ID

Specifies your ORCID client ID.

1. Via **config file** property `jatos.user.authentication.orcid.clientId`

   ~~~shell
   jatos.user.authentication.orcid.clientId = "APP-ABCDEFGHIJKLMNOP"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.orcid.clientId`

   ~~~shell
   -Djatos.user.authentication.orcid.clientId="APP-ABCDEFGHIJKLMNOP"
   ~~~

### ORCID client secret

Specifies your ORCID client secret.

1. Via **config file** property `jatos.user.authentication.orcid.clientSecret`

   ~~~shell
   jatos.user.authentication.orcid.clientSecret = "1234abcd-12ab-12ab-12ab-123456abcdef"
   ~~~

1. Via **command-line** argument `-Djatos.user.authentication.orcid.clientSecret`

   ~~~shell
   -Djatos.user.authentication.orcid.clientSecret="1234abcd-12ab-12ab-12ab-123456abcdef"
   ~~~


## User password restrictions

By default JATOS' keeps it simple and relies on the users to choose save passwords: it just enforces a length of at least 7 characters. But this can be changed with the following two properties.

### Password length

1. Via **config file** property `jatos.user.password.length`

   ~~~shell
   jatos.user.password.length = 8
   ~~~

1. Via **command-line** argument `-Djatos.user.password.length`

   ~~~shell
   -Djatos.user.password.length=8
   ~~~

### Password strength

Can be one of the following. Default is 0.

* 0 - No restrictions on characters
* 1 - At least one Latin letter and one number
* 2 - At least one Latin letter, one number and one special character (out of `#?!@$%^&*-`)
* 3 - At least one uppercase Latin letter, one lowercase Latin letter, one number and one special character (out of `#?!@$%^&*-`)

1. Via **config file** property `jatos.user.password.strength`

   ~~~shell
   jatos.user.password.strength = 3
   ~~~

1. Via **command-line** argument `-Djatos.user.password.strength`

   ~~~shell
   -Djatos.user.password.strength=3
   ~~~


## Database

See [JATOS with MySQL](JATOS-with-MySQL.html).

Old style database properties beginning with _db.default_ are deprecated and the new properties beginning with _jatos.db_ should be used instead.

### Database URL

1. Via **config file** property `jatos.db.url`

   ~~~shell
   jatos.db.url = "jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
   ~~~

1. Via **command-line** argument `-Djatos.db.url`

   ~~~shell
   -Djatos.db.url="jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
   ~~~

1. Via **environment** variable `JATOS_DB_URL`

   ~~~shell
   JATOS_DB_URL="jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
   ~~~

### Username and password

1. Via **config file** properties `jatos.db.username` and `jatos.db.password`

   ~~~shell
   jatos.db.username = "myusername"
   jatos.db.password = "mypassword"
   ~~~

1. Via **command-line** argument `-Djatos.db.username` and `-Djatos.db.password`

   ~~~shell
   -Djatos.db.username = "myusername" -Djatos.db.password = "mypassword"
   ~~~

1. Via **environment** variable `JATOS_DB_USERNAME` and `JATOS_DB_PASSWORD`

   ~~~shell
   JATOS_DB_USERNAME="myusername"
   JATOS_DB_PASSWORD="mypassword"
   ~~~

### Database driver

For modern MySQL or MariaDB databases this property needs to be set to `com.mysql.cj.jdbc.Driver`.

1. Via **config file** property `jatos.db.driver`

   ~~~shell
   jatos.db.driver = "com.mysql.cj.jdbc.Driver"
   ~~~

1. Via **command-line** argument `-Djatos.db.driver`

   ~~~shell
   -Djatos.db.driver="com.mysql.cj.jdbc.Driver"
   ~~~

1. Via **environment** variable `JATOS_DB_DRIVER`

   ~~~shell
   JATOS_DB_DRIVER="com.mysql.cj.jdbc.Driver"
   ~~~


## Multi-node mode

If you intend to run JATOS on multiple machines in parallel in a cluster you have to set this property to `true`. Default is `false`.

1. Via **config file** property `jatos.multiNode`

   ~~~shell
   jatos.multiNode = true
   ~~~

1. Via **command-line** argument `-Djatos.multiNode`

   ~~~shell
   -Djatos.multiNode = true
   ~~~


## User session configuration

### Timeout

User session timeout in minutes. Default is 1440 minutes (1 day).

1. Via **config file** property `jatos.userSession.timeout`

   ~~~shell
   jatos.userSession.timeout = 180
   ~~~

1. Via **command-line** argument `-Djatos.userSession.timeout`

   ~~~shell
   -Djatos.userSession.timeout = 180
   ~~~

### Inactivity timeout

User session timeout after inactivity in minutes. Default is 60 minutes.

1. Via **config file** property `jatos.userSession.inactivity`

   ~~~shell
   jatos.userSession.inactivity = 120
   ~~~

1. Via **command-line** argument `-Djatos.userSession.inactivity`

   ~~~shell
   -Djatos.userSession.inactivity=120
   ~~~

### Secure session

This property can be used to restrict user access to HTTPS. Default is `false`.

1. Via **config file** property `play.http.session.secure`

   ~~~shell
   play.http.session.secure = true
   ~~~

1. Via **command-line** argument `-Dplay.http.session.secure`

   ~~~shell
   -Dplay.http.session.secure=true
   ~~~


## ID cookies

### Secure ID cookies

This property can be used to restrict participant access to HTTPS. Sets the ID cookie's _secure_ attribute. Default is `false`.

1. Via **config file** property `jatos.idCookies.secure`

   ~~~shell
   jatos.idCookies.secure = true
   ~~~

1. Via **command-line** argument `-Djatos.idCookies.secure`

   ~~~shell
   -Djatos.idCookies.secure=true
   ~~~

### _SameSite_ attribute

Defines the IDCookies' _SameSite_ attribute. Possible values are `None`, `Lax`, or `Strict`. Setting to `Strict` makes the usage of external recruiting tools, like MTurk, impossible. Default is `None`.

1. Via **config file** property `jatos.idCookies.sameSite`

   ~~~shell
   jatos.idCookies.sameSite = "Lax"
   ~~~

1. Via **command-line** argument `-Djatos.idCookies.sameSite`

   ~~~shell
   -Djatos.idCookies.sameSite = "Lax"
   ~~~


## PID file location

Defines the location of the PID file in the file system.

1. Via **config file** property `play.pidfile.path`

   ~~~shell
   play.pidfile.path = "/var/run/jatos.pid"
   ~~~

1. Via **command-line** argument `-Dplay.pidfile.path`

   ~~~shell
   -Dplay.pidfile.path = "/var/run/jatos.pid"
   ~~~


## Home page

### Welcome message

Specifies a URL that can be used by JATOS to fetch some static HTML. This HTML will then be shown on the home page instead of the default welcome message ([more info](/Customize-JATOS-Home-Page.html)). If left empty (`""`) the default welcome message is shown. Default is empty.

1. Via **config file** property `jatos.brandingUrl`

   ~~~shell
   jatos.brandingUrl = "https://mydomain.com/foobar-university-welcome-page.html"
   ~~~

1. Via **command-line** argument `-Djatos.brandingUrl`

   ~~~shell
   -Djatos.brandingUrl = "https://mydomain.com/foobar-university-welcome-page.html"
   ~~~

### 'Terms of use' info box

Specifies a URL link to the 'terms of use' that will be shown in an info box on the home page. If left empty (`""`) the info box is not shown. Default is empty.

1. Via **config file** property `jatos.termsOfUseUrl`

   ~~~shell
   jatos.termsOfUseUrl = "https://mydomain.com/my-terms-of-use.html"
   ~~~

1. Via **command-line** argument `-Djatos.termsOfUseUrl`

   ~~~shell
   -Djatos.termsOfUseUrl = "https://mydomain.com/my-terms-of-use.html"
   ~~~


## Study administration page 

Enable/disable some columns in the study administration table. Sometimes the calculation of those columns takes too much time
due to a slow database or file system.

1. Via **config file** properties `jatos.studyAdmin.showStudyAssetsSize`, `jatos.studyAdmin.showResultDataSize`, and `jatos.studyAdmin.showResultFileSize`

   ~~~shell
   jatos.studyAdmin.showStudyAssetsSize = false # Default is true
   jatos.studyAdmin.showResultDataSize = true # Default is false
   jatos.studyAdmin.showResultFileSize = true # Default is false
   ~~~

1. Via **command-line** arguments `-Djatos.studyAdmin.showStudyAssetsSize`, `-Djatos.studyAdmin.showResultDataSize`, and `-Djatos.studyAdmin.showResultFileSize`

   ~~~shell
   -Djatos.studyAdmin.showStudyAssetsSize = false # Default is true
   -Djatos.studyAdmin.showResultDataSize = true # Default is false
   -Djatos.studyAdmin.showResultFileSize = true # Default is false
   ~~~


## JATOS API

Enable/disable the JATOS API. By default it is enabled (`true`).

1. Via **config file** property `jatos.api.allowed`

   ~~~shell
   jatos.api.allowed = false
   ~~~

1. Via **command-line** argument `-Djatos.api.allowed`

   ~~~shell
   -Djatos.api.allowed = false
   ~~~
