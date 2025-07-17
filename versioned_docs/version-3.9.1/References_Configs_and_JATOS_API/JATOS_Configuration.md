---
title: JATOS Configuration
slug: /JATOS_Configuration.html
sidebar_position: 2
---

JATOS properties can be configured in three different ways:

1. **Config file** (`jatos.conf` or `production.conf`)
2. **Command-line arguments**
3. **Environment variables** (only for some properties)

The config file is located in the JATOS folder under `./conf` and is named `jatos.conf` for versions >= 3.8.3 and `production.conf` for versions < 3.8.3. It uses the [HOCON format](https://github.com/lightbend/config/blob/main/HOCON.md).  
**Remember to always restart JATOS after making any changes to a config file.**

Command-line argument names are usually the same as in the config file, but prefixed with `-D` (except JVM arguments, which use `-J`). For example: `jatos.urlBasePath` and `-Djatos.urlBasePath`.

Command-line arguments can be appended to JATOS' `loader.sh start` command. For example, to set `jatos.urlBasePath` and `jatos.tmpPath`:

~~~shell
./loader.sh start -Djatos.urlBasePath="/mybasepath/" -Djatos.tmpPath="/my/tmp/dir"
~~~

---

## JVM Arguments

JVM arguments (for the Java Virtual Machine) are special since they are not directly intended for JATOS but for the JVM running JATOS.  
They can **only be specified via command-line arguments** and must be prefixed with `-J`.

A commonly used JVM argument is `-Xmx`, which limits JATOS's memory usage (specifically, the JVM's maximum heap memory).  
It must be written as `-J-Xmx`, e.g., to allow 4GB memory: `-J-Xmx4G`.

---

## HTTP Config

### Address and Port

By default, JATOS binds to all locally available IP addresses (including 127.0.0.1) on port 9000.  
Usually, JATOS is installed together with a reverse proxy (e.g., Nginx or Apache), but if you don't want to use a proxy, you must set up the hostname or IP address and port.

- **For v3.8.1 and lower:** `play.server.http.address` and `play.server.http.port`
- **For v3.8.2 and higher:** `jatos.http.address` and `jatos.http.port`

**Config file example:**
~~~shell
jatos.http.address = 1.2.3.4
jatos.http.port = 80
~~~

**Command-line example:**
~~~shell
-Djatos.http.address=1.2.3.4 -Djatos.http.port=80
~~~

### Server Idle Timeout

The idle timeout for an open connection, after which it will be closed.  
Set to `null` or `infinite` to disable the timeout (not recommended for security reasons). Default is 75 seconds.

**Config file:**
~~~shell
play.server.http.idleTimeout = 100s
~~~

**Command-line:**
~~~shell
-Dplay.server.http.idleTimeout=100s
~~~

### Request Timeout

How long a request can take before timing out. Set to `null` or `infinite` to disable. Default is `infinite`.

**Config file:**
~~~shell
play.server.akka.requestTimeout = 100s
~~~

**Command-line:**
~~~shell
-Dplay.server.akka.requestTimeout=100s
~~~

### URL Base Path

JATOS can be configured to use a base path. For example, if your host is _www.example.org_ and JATOS runs under _mybasepath_, all URLs start with _www.example.org/mybasepath/_.

**The path must always start and end with a "/".**  
If you add a base path, adjust all absolute paths to study assets in your HTML and JavaScript files, or use [relative paths](Adapt-pre-written-code-to-run-it-in-JATOS.html#create-the-study-in-jatos) (recommended).

- **For v3.8.1 and lower:** `play.http.context`
- **For v3.8.2 and higher:** `jatos.urlBasePath`

**Config file:**
~~~shell
jatos.urlBasePath = "/mybasepath/"
~~~

**Command-line:**
~~~shell
-Djatos.urlBasePath="/mybasepath/"
~~~

**Environment variable:**
~~~shell
JATOS_URL_BASE_PATH="/mybasepath/"
~~~

---

## Embedding in frames or iframes

The [X-Frame-Options header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) controls whether a JATOS study can be embedded in an iframe/frame.  
Possible values are `DENY`, `SAMEORIGIN`, or `null` (allow everywhere). Default is `SAMEORIGIN`. The [CSP directive 'frame-ancestors'](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors) is not currently supported by JATOS.

**Config file:**
~~~shell
play.filters.headers.frameOptions = null
~~~

**Command-line:**
~~~shell
-Dplay.filters.headers.frameOptions=null
~~~

---

## Trusted Certificates

You can add multiple certificates, e.g., for encrypted LDAP. _type_ can be `PKCS12`, `JKS`, or `PEM`.

**Config file:**
~~~shell
play.ws.ssl.trustManager.stores = [ { type = "PEM", path = "conf/certs/ca.pem" } ]
~~~

---

## Study Assets Root Path

The study assets root folder is where all study HTML, JavaScript files, etc., are stored.  
By default, it is in the JATOS folder and named _study_assets_root_, except in Docker, where it is under _/opt/jatos_data/study_assets_root_.

**Config file:**
~~~shell
jatos.studyAssetsRootPath = "/path/to/my/assets/root/folder"
~~~

**Command-line:**
~~~shell
-Djatos.studyAssetsRootPath="/path/to/my/assets/root/folder"
~~~

**Environment variable:**
~~~shell
JATOS_STUDY_ASSETS_ROOT_PATH="/path/to/my/assets/root/folder"
~~~

---

## Temporary Directory Path

(Only in version >= 3.8.3)

JATOS uses a directory to temporarily store files (e.g., during study import).  
By default, the system's temp directory is used (on Linux/Unix: _/tmp_, on Windows: _c:\temp_). In Docker, it's _/opt/jatos_data/tmp_.

**Config file:**
~~~shell
jatos.tmpPath = "/my/tmp/dir"
~~~

**Command-line:**
~~~shell
-Djatos.tmpPath="/my/tmp/dir"
~~~

**Environment variable:**
~~~shell
JATOS_TMP_PATH="/my/tmp/dir"
~~~

---

## Application Logs

The application log records messages from the JATOS application. Logs are rotated daily, with a history of up to 30 days.

_Do not confuse application logs with [study logs](#study-logs)._

### Application Logs Path

By default, logs are in the JATOS folder under _./logs_.

**Config file:**
~~~shell
jatos.logs.path = "/my/dir/logs"
~~~

**Command-line:**
~~~shell
-Djatos.logs.path="/my/dir/logs"
~~~

**Environment variable:**
~~~shell
JATOS_LOGS_PATH="/my/dir/logs"
~~~

### Application Logs Filename

Default filename is _application_ (without suffix).

**Config file:**
~~~shell
jatos.logs.filename = "myFilename"
~~~

**Command-line:**
~~~shell
-Djatos.logs.filename="myFilename"
~~~

**Environment variable:**
~~~shell
JATOS_LOGS_FILENAME="myFilename"
~~~

### Application Logs Appender

Can be `ASYNCSTDOUT` or `ASYNCFILE` (default). Use `ASYNCSTDOUT` to log to stdout instead of a file.

**Config file:**
~~~shell
jatos.logs.appender = ASYNCSTDOUT
~~~

**Command-line:**
~~~shell
-Djatos.logs.appender=ASYNCSTDOUT
~~~

**Environment variable:**
~~~shell
JATOS_LOGS_APPENDER=ASYNCSTDOUT
~~~

---

## Study Logs

Each study in JATOS has its own study log ([more info](/Study-Log.html)).  
Among other things, it calculates hashes of result data, which can be CPU-intensive. On smaller machines, it may be better to disable it.

_Do not confuse study logs with [application logs](#application-logs)._

### Enable/Disable Study Logging

Enabled by default.

**Config file:**
~~~shell
jatos.studyLogs.enabled = false
~~~

**Command-line:**
~~~shell
-Djatos.studyLogs.enabled=false
~~~

### Path to Study Logs

By default, study logs are stored in the JATOS folder under _./study_logs_.

**Config file:**
~~~shell
jatos.studyLogs.path = "/path/to/my/jatos_study_logs"
~~~

**Command-line:**
~~~shell
-Djatos.studyLogs.path="/path/to/my/jatos_study_logs"
~~~

**Environment variable:**
~~~shell
JATOS_STUDY_LOGS_PATH="/path/to/my/jatos_study_logs"
~~~

---

## File Extensions

### Study Archive

(Only in version >= 3.9.7)

Specifies the file suffix of JATOS study archives. The default is `jzip`.

**Config file:**
~~~shell
jatos.studyArchive.suffix = "zip"
~~~

**Command-line:**
~~~shell
-Djatos.studyArchive.suffix="zip"
~~~

### Results Archive

(Only in version >= 3.9.7)

Specifies the file suffix of JATOS results archives. The default suffix was `jrzip` in JATOS version older than 3.9.7, and is `zip` in newer versions.

**Config file:**
~~~shell
jatos.resultsArchive.suffix = "jrzip"
~~~

**Command-line:**
~~~shell
-Djatos.resultsArchive.suffix="jrzip"
~~~

---

## Study Members

Allow all users on a JATOS instance to be added at once as members of a study. Useful in small setups (e.g., lab installations). Default is `false`.

**Config file:**
~~~shell
jatos.studyMembers.allowAddAllUsers = true
~~~

**Command-line:**
~~~shell
-Djatos.studyMembers.allowAddAllUsers=true
~~~

---

## Results Pagination

Maximum number of results fetched from the DB at once. Default is 10.

**Config file:**
~~~shell
jatos.maxResultsDbQuerySize = 5
~~~

**Command-line:**
~~~shell
-Djatos.maxResultsDbQuerySize=5
~~~

---

## Result Data

Maximum size of the result data for one component run. Default is 5MB.

**Config file:**
~~~shell
jatos.resultData.maxSize = 10MB
~~~

**Command-line:**
~~~shell
-Djatos.resultData.maxSize=10MB
~~~

---

## Result File Uploading

During study runs, it is possible to upload files to JATOS (usually with results). This is an alternative to result data stored in the database. You can also download previously uploaded files during a study run.

### Enable/Disable Result File Uploading

Default is `true` (enabled).

**Config file:**
~~~shell
jatos.resultUploads.enabled = false
~~~

**Command-line:**
~~~shell
-Djatos.resultUploads.enabled=false
~~~

### Path to Result Files

By default, uploaded result files are stored in the JATOS folder under _./result_uploads_.

**Config file:**
~~~shell
jatos.resultUploads.path = "/path/to/my/jatos_result_uploads"
~~~

**Command-line:**
~~~shell
-Djatos.resultUploads.path="/path/to/my/jatos_result_uploads"
~~~

**Environment variable:**
~~~shell
JATOS_RESULT_UPLOADS_PATH="/path/to/my/jatos_result_uploads"
~~~

### Max File Size

Maximum file size per uploaded file. Default is 30MB.

**Config file:**
~~~shell
jatos.resultUploads.maxFileSize = 100MB
~~~

**Command-line:**
~~~shell
-Djatos.resultUploads.maxFileSize=100MB
~~~

**Environment variable:**
~~~shell
JATOS_RESULT_UPLOADS_MAX_FILE_SIZE=100MB
~~~

### All Files Size Limit per Study Run

Maximum total size of all files uploaded during one study run. Default is 50MB.

**Config file:**
~~~shell
jatos.resultUploads.limitPerStudyRun = 100MB
~~~

**Command-line:**
~~~shell
-Djatos.resultUploads.limitPerStudyRun=100MB
~~~

**Environment variable:**
~~~shell
JATOS_RESULT_UPLOADS_LIMIT_PER_STUDY_RUN=100MB
~~~

---

## Superuser

The _Superuser_ role allows a user to **access ANY study** on this JATOS as if they were a member, including accessing result data and deleting the study. Useful in small setups or when a dedicated person manages studies. Default is `false`.

If set to `true`, an Admin can grant the Superuser role to any user.

**Config file:**
~~~shell
jatos.user.role.allowSuperuser = true
~~~

**Command-line:**
~~~shell
-Djatos.user.role.allowSuperuser=true
~~~

---

## LDAP Authentication

Currently, LDAP users must be added manually in JATOS' _User manager_ (with the LDAP switch enabled). Only authentication is done via LDAP.

If your LDAP server uses encryption, add your certificate to JATOS' trusted certificates using `play.ws.ssl.trustManager.stores` (only possible in a config file).  
For example, if your certificate is at `/jatos/conf/certs/ca.pem`:

~~~shell
play.ws.ssl.trustManager.stores = [
    { type = "PEM", path = "/jatos/conf/certs/ca.pem" }
    { path: ${java.home}/lib/security/cacerts, password = "changeit" }
]
~~~

The first line adds your certificate (_type_ can be `PKCS12`, `JKS`, or `PEM`). The second line adds Java's default keystore. Its default password is "changeit" ([do not change it](https://stackoverflow.com/a/32371148/1278769)).

### LDAP URL

Specifies the LDAP server URL. Not set or empty disables LDAP authentication. Default is empty (`""`).

**Config file:**
~~~shell
jatos.user.authentication.ldap.url = "ldap://my.ldap.org:389"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.ldap.url="ldap://my.ldap.org:389"
~~~

### LDAP User Attribute Origin

(Only in version >= 3.9.6)

Defines the LDAP user attribute name, e.g., 'uid' or 'cn'. Default is 'uid'.

**Config file:**
~~~shell
jatos.user.authentication.ldap.userAttribute = "cn"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.ldap.userAttribute="cn"
~~~

### LDAP Base DN

Specifies the base DN (distinguished name). Can be a single DN string or a list of DNs in brackets. Not set or empty disables LDAP authentication. Default is empty (`""`).

**Config file:**
~~~shell
jatos.user.authentication.ldap.basedn = "dc=example,dc=com"
~~~

or as a list:

~~~shell
jatos.user.authentication.ldap.basedn = ["ou=students,dc=example,dc=com", "ou=scientists,dc=example,dc=com"]
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.ldap.basedn="dc=example,dc=com"
~~~

or as a list:

~~~shell
-Djatos.user.authentication.ldap.basedn.0=ou=students,dc=example,dc=com
-Djatos.user.authentication.ldap.basedn.1=ou=scientists,dc=example,dc=com
~~~

### LDAP Admin DN and Password

Specifies a DN and password for an (optional) admin user with rights to search for other users. Some LDAP servers require this if binding directly to a _uid_ is not possible. Not set or empty means no admin user is needed. Default is empty (`""`).

**Config file:**
~~~shell
jatos.user.authentication.ldap.admin.dn = "cn=read-only-admin,dc=example,dc=com"
jatos.user.authentication.ldap.admin.password = "mypassword"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.ldap.admin.dn="cn=read-only-admin,dc=example,dc=com"
-Djatos.user.authentication.ldap.admin.password="mypassword"
~~~

### LDAP Timeout

Time in milliseconds JATOS waits for a response from your LDAP server. Default is 5000 ms.

**Config file:**
~~~shell
jatos.user.authentication.ldap.timeout = 10000
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.ldap.timeout=10000
~~~

---

## Google Sign-In

JATOS users can be authenticated by Google Sign-In. Not set or empty disables Google authentication. Default is empty (`""`).

Specifies the [Google API client ID](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid).

**Config file:**
~~~shell
jatos.user.authentication.oauth.googleClientId = "1234567890-abc123abc123.apps.googleusercontent.com"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oauth.googleClientId="1234567890-abc123abc123.apps.googleusercontent.com"
~~~

---

## OpenID Connect (OIDC) Authentication

(Only in version >= 3.8.5)

JATOS users can be authenticated by [OIDC sign-in](https://openid.net/developers/how-connect-works/), e.g., with [Keycloak](https://www.keycloak.org/).

### OIDC Discovery URL

Specifies the OIDC provider's discovery URL (usually ends in `.well-known/openid-configuration`).

**Config file:**
~~~shell
jatos.user.authentication.oidc.discoveryUrl = "http://myOidcProvider/.well-known/openid-configuration"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oidc.discoveryUrl="http://myOidcProvider/.well-known/openid-configuration"
~~~

### OIDC Client ID

Specifies the OIDC client ID. Not set or empty disables OIDC authentication. Default is empty (`""`).

**Config file:**
~~~shell
jatos.user.authentication.oidc.clientId = "myClientId"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oidc.clientId="myClientId"
~~~

### OIDC Client Secret

Specifies the OIDC client secret. Optional; can be left empty (`""`).

**Config file:**
~~~shell
jatos.user.authentication.oidc.clientSecret = "myClientSecret"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oidc.clientSecret="myClientSecret"
~~~

### OIDC Scope

(Only in version >= 3.9.6)

Specifies your OIDC scope. Default is `["openid"]`.

**Config file:**
~~~shell
jatos.user.authentication.oidc.scope = ["your", "scopes"]
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oidc.scope.0=your
-Djatos.user.authentication.oidc.scope.1=scopes
~~~

### OIDC Username Origin

(Only in version >= 3.9.6)

Specifies where the username for the user in JATOS should be taken from. Can be `"subject"` or `"email"`. Default is `"subject"`.

**Config file:**
~~~shell
jatos.user.authentication.oidc.usernameFrom = "email"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oidc.usernameFrom="email"
~~~

### OIDC ID Token Signing Algorithm

Specifies the OIDC ID token signing algorithm. Default is `RS256`.

**Config file:**
~~~shell
jatos.user.authentication.oidc.idTokenSigningAlgorithm = "ES512"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oidc.idTokenSigningAlgorithm="ES512"
~~~

### OIDC Sign-In Button Text

Specifies the text of the OIDC sign-in button on the login page. Default is `Sign in with OIDC`.

**Config file:**
~~~shell
jatos.user.authentication.oidc.signInButtonText = "Sign in with ABC university"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oidc.signInButtonText="Sign in with ABC university"
~~~

### OIDC Sign-In Button Logo

Specifies the URL of a logo to use instead of the standard OIDC logo. Default is the OIDC logo.

**Config file:**
~~~shell
jatos.user.authentication.oidc.signInButtonLogoUrl = "http://somedomain/logo.svg"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oidc.signInButtonLogoUrl="http://somedomain/logo.svg"
~~~

### OIDC Success Feedback

Specifies the text of a message shown after a successful sign-in. If left empty (`""`), no message is shown. Default is `""`.

**Config file:**
~~~shell
jatos.user.authentication.oidc.successFeedback = "You successfully signed in with ABC university"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.oidc.successFeedback="You successfully signed in with ABC university"
~~~

---

## ORCID Authentication

(Only in version >= 3.8.5)

JATOS users can be authenticated by [ORCID sign-in](https://info.orcid.org/documentation/features/public-api/orcid-as-a-sign-in-option-to-your-system/). Internally, ORCID uses OpenID Connect.

### ORCID Client ID

**Config file:**
~~~shell
jatos.user.authentication.orcid.clientId = "APP-ABCDEFGHIJKLMNOP"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.orcid.clientId="APP-ABCDEFGHIJKLMNOP"
~~~

### ORCID Client Secret

**Config file:**
~~~shell
jatos.user.authentication.orcid.clientSecret = "1234abcd-12ab-12ab-12ab-123456abcdef"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.orcid.clientSecret="1234abcd-12ab-12ab-12ab-123456abcdef"
~~~

### ORCID OIDC Scope

(Only in version >= 3.9.6)

Default is `["openid"]`.

**Config file:**
~~~shell
jatos.user.authentication.orcid.scope = ["your", "scopes"]
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.orcid.scope.0=your
-Djatos.user.authentication.orcid.scope.1=scopes
~~~

### ORCID Username Origin

(Only in version >= 3.9.6)

Specifies where the username for the user in JATOS should be taken from. Can be `"subject"` or `"email"`. Default is `"subject"`.

**Config file:**
~~~shell
jatos.user.authentication.orcid.usernameFrom = "email"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.orcid.usernameFrom="email"
~~~

---

## SURF SRAM (sram.surf.nl) Authentication

(Only in version >= 3.9.6)

JATOS users can be authenticated by [SURF SRAM sign-in](https://sram.surf.nl). Internally, SURF SRAM uses OpenID Connect.

### SURF SRAM Client ID

**Config file:**
~~~shell
jatos.user.authentication.sram.clientId = "APP-ABCDEFGHIJKLMNOP"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.sram.clientId="APP-ABCDEFGHIJKLMNOP"
~~~

### SURF SRAM Client Secret

**Config file:**
~~~shell
jatos.user.authentication.sram.clientSecret = "1234abcd1234abcd1234abcd1234abcd"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.sram.clientSecret="1234abcd1234abcd1234abcd1234abcd"
~~~

### SURF SRAM OIDC Scope

Default is `["openid", "profile", "email", "voperson_external_id"]`.

**Config file:**
~~~shell
jatos.user.authentication.sram.scope = ["your", "scopes"]
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.sram.scope.0=your
-Djatos.user.authentication.sram.scope.1=scopes
~~~

### SURF SRAM Username Origin

Specifies where the username for the user in JATOS should be taken from. The username is defined by either SRAM's "subject", "email", or "eduperson_principal_name". Default is `"eduperson_principal_name"`.

**Config file:**
~~~shell
jatos.user.authentication.sram.usernameFrom = "subject"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.sram.usernameFrom="subject"
~~~

---

## SURFconext (surfconext.nl) Authentication

(Only in version >= 3.9.6)

JATOS users can be authenticated by [SURFconext sign-in](https://surfconext.nl). Internally, SURFconext uses OpenID Connect.

### SURFconext Discovery URL

**Config file:**
~~~shell
jatos.user.authentication.conext.discoveryUrl = "http://myOidcProvider/.well-known/openid-configuration"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.conext.discoveryUrl="http://myOidcProvider/.well-known/openid-configuration"
~~~

### SURFconext Client ID

**Config file:**
~~~shell
jatos.user.authentication.conext.clientId = "APP-ABCDEFGHIJKLMNOP"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.conext.clientId="APP-ABCDEFGHIJKLMNOP"
~~~

### SURFconext Client Secret

**Config file:**
~~~shell
jatos.user.authentication.conext.clientSecret = "1234abcd-12ab-12ab-12ab-123456abcdef"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.conext.clientSecret="1234abcd-12ab-12ab-12ab-123456abcdef"
~~~

### SURFconext OIDC Scope

Default is `["openid"]`.

Note: SURFconext does not use scopes to request claims (also see the [documentation](https://servicedesk.surf.nl/wiki/spaces/IAM/pages/128909987/OpenID+Connect+features#OpenIDConnectfeatures-Scopes)). Claims are configured per service entity in the [Service Provider Dashboard](https://sp.surfconext.nl). For JATOS to function, enable the claims "name", "email", and "eduperson_principal_name". If the SURFconext username origin is set to a value other than the default of `"eduperson_principal_name"`, then the "eduperson_principal_name" claim may be disabled.

**Config file:**
~~~shell
jatos.user.authentication.conext.scope = ["your", "scopes"]
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.conext.scope.0=your
-Djatos.user.authentication.conext.scope.1=scopes
~~~

### SURFconext Username Origin

Specifies where the username for the user in JATOS should be taken from. The username is defined by either SURFconext's "subject", "email", or "eduperson_principal_name". Default is `"eduperson_principal_name"`.

Note that SURFconext's subject can be of two types: transient or persistent (also see the [documentation](https://servicedesk.surf.nl/wiki/spaces/IAM/pages/128909938/Claims#Claims-Useridentifiers)). If the SURFconext username origin is set to `"subject"`, then the service entity's subject type must be set to **persistent** in the [Service Provider Dashboard](https://sp.surfconext.nl).

**Config file:**
~~~shell
jatos.user.authentication.conext.usernameFrom = "subject"
~~~

**Command-line:**
~~~shell
-Djatos.user.authentication.conext.usernameFrom="subject"
~~~

---

## User Password Restrictions

By default, JATOS enforces only a minimum length of 7 characters. You can increase restrictions as needed.

### Password Length

**Config file:**
~~~shell
jatos.user.password.length = 8
~~~

**Command-line:**
~~~shell
-Djatos.user.password.length=8
~~~

### Password Strength

Possible values:
- 0: No restrictions (default)
- 1: At least one Latin letter and one number
- 2: At least one Latin letter, one number, and one special character (out of `#?!@$%^&*-`)
- 3: At least one uppercase Latin letter, one lowercase Latin letter, one number, and one special character (out of `#?!@$%^&*-`)

**Config file:**
~~~shell
jatos.user.password.strength = 3
~~~

**Command-line:**
~~~shell
-Djatos.user.password.strength=3
~~~

---

## Database

See [JATOS with MySQL](JATOS-with-MySQL.html).

Old-style properties beginning with _db.default_ are deprecated; use _jatos.db_* properties instead.

### Database URL

**Config file:**
~~~shell
jatos.db.url = "jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
~~~

**Command-line:**
~~~shell
-Djatos.db.url="jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
~~~

**Environment variable:**
~~~shell
JATOS_DB_URL="jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
~~~

### Username and Password

**Config file:**
~~~shell
jatos.db.username = "myusername"
jatos.db.password = "mypassword"
~~~

**Command-line:**
~~~shell
-Djatos.db.username="myusername" -Djatos.db.password="mypassword"
~~~

**Environment variable:**
~~~shell
JATOS_DB_USERNAME="myusername"
JATOS_DB_PASSWORD="mypassword"
~~~

### Database Driver

For modern MySQL or MariaDB, use `com.mysql.cj.jdbc.Driver`.

**Config file:**
~~~shell
jatos.db.driver = "com.mysql.cj.jdbc.Driver"
~~~

**Command-line:**
~~~shell
-Djatos.db.driver="com.mysql.cj.jdbc.Driver"
~~~

**Environment variable:**
~~~shell
JATOS_DB_DRIVER="com.mysql.cj.jdbc.Driver"
~~~

### Database Connection Pool Size

(Only in version >= 3.9.7)

Specifies the number of database connections. This setting should be configured in conjunction with `jatos.threadPool.size`. The default is 100.

**Config file:**
~~~shell
jatos.db.connectionPool.size = 140
~~~

**Command-line:**
~~~shell
-Djatos.db.connectionPool.size=140
~~~

**Environment variable:**
~~~shell
JATOS_DB_CONNECTIONPOOL_SIZE=140
~~~

---

## JATOS Thread Pool Size

(Only in version >= 3.9.7)

The size of the thread pool used by JATOS. The default is 150. This setting should be configured in conjunction with `jatos.db.connectionPool.size`. As a rule of thumb, `jatos.threadPool.size` can be set to `1.5 * jatos.db.connectionPool.size`.

**Config file:**
~~~shell
jatos.threadPool.size = 210
~~~

**Command-line:**
~~~shell
-Djatos.threadPool.size=210
~~~

**Environment variable:**
~~~shell
JATOS_THREADPOOL_SIZE=210
~~~

---

## Multi-Node Mode

If you intend to run JATOS on multiple machines in parallel (a cluster), set this property to `true`. Default is `false`.

**Config file:**
~~~shell
jatos.multiNode = true
~~~

**Command-line:**
~~~shell
-Djatos.multiNode=true
~~~

---

## User Session Configuration

### Timeout

User session timeout in minutes. Default is 1440 minutes (1 day).

**Config file:**
~~~shell
jatos.userSession.timeout = 180
~~~

**Command-line:**
~~~shell
-Djatos.userSession.timeout=180
~~~

### Inactivity Timeout

User session timeout after inactivity, in minutes. Default is 60 minutes.

**Config file:**
~~~shell
jatos.userSession.inactivity = 120
~~~

**Command-line:**
~~~shell
-Djatos.userSession.inactivity=120
~~~

### Secure Session

Restrict user access to HTTPS. Default is `false`.

**Config file:**
~~~shell
play.http.session.secure = true
~~~

**Command-line:**
~~~shell
-Dplay.http.session.secure=true
~~~

---

## JATOS ID Cookies

### Secure ID Cookies

Restrict participant access to HTTPS by setting the ID cookie's _secure_ attribute. Default is `false`.

**Config file:**
~~~shell
jatos.idCookies.secure = true
~~~

**Command-line:**
~~~shell
-Djatos.idCookies.secure=true
~~~

### _SameSite_ Attribute

Defines the ID cookie's [_SameSite_ attribute](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie). Possible values: `Lax`, `Strict`, `null` (not set), and since v3.9.7, `None`. Setting to `Strict` makes the use of external recruiting tools (like Prolific) impossible. Default is `None`.

**Config file:**
~~~shell
jatos.idCookies.sameSite = "Lax"
~~~

**Command-line:**
~~~shell
-Djatos.idCookies.sameSite="Lax"
~~~

### ID Cookie Limit

(Only in version >= 3.9.7)

Maximum number of ID cookies per browser (limits parallel study runs in the same browser). Default is 10. Must be at least 1. More than 20 may cause a 'HTTP header too large' error.

**Config file:**
~~~shell
jatos.idCookies.limit = 20
~~~

**Command-line:**
~~~shell
-Djatos.idCookies.limit=20
~~~

---

## PID File Location

Defines the location of the PID file.

**Config file:**
~~~shell
play.pidfile.path = "/var/run/jatos.pid"
~~~

**Command-line:**
~~~shell
-Dplay.pidfile.path="/var/run/jatos.pid"
~~~

---

## Home Page

### Welcome Message

Specifies a URL for JATOS to fetch static HTML, which will be shown on the home page instead of the default welcome message ([more info](/Customize-JATOS-Home-Page.html)). If left empty, the default message is shown.

**Config file:**
~~~shell
jatos.brandingUrl = "https://mydomain.com/foobar-university-welcome-page.html"
~~~

**Command-line:**
~~~shell
-Djatos.brandingUrl="https://mydomain.com/foobar-university-welcome-page.html"
~~~

### 'Terms of Use' Info Box

Specifies a URL link to the 'terms of use' to be shown in an info box on the home page. If left empty, the info box is not shown.

**Config file:**
~~~shell
jatos.termsOfUseUrl = "https://mydomain.com/my-terms-of-use.html"
~~~

**Command-line:**
~~~shell
-Djatos.termsOfUseUrl="https://mydomain.com/my-terms-of-use.html"
~~~

---

## Study Manager Page

Enable/disable columns in the study manager table. Sometimes calculating these columns takes too long due to a slow database or file system.

**Config file:**
~~~shell
jatos.studyAdmin.showStudyAssetsSize = false # Default is true
jatos.studyAdmin.showResultDataSize = true   # Default is false
jatos.studyAdmin.showResultFileSize = true   # Default is false
~~~

**Command-line:**
~~~shell
-Djatos.studyAdmin.showStudyAssetsSize=false # Default is true
-Djatos.studyAdmin.showResultDataSize=true   # Default is false
-Djatos.studyAdmin.showResultFileSize=true   # Default is false
~~~

---

## JATOS API

Enable or disable the JATOS API. Default is enabled (`true`).

**Config file:**
~~~shell
jatos.api.allowed = false
~~~

**Command-line:**
~~~shell
-Djatos.api.allowed=false
~~~
