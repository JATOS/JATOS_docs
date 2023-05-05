---
title: Configure JATOS on a Server
slug: /Configure-JATOS-on-a-Server.html
sidebar_position: 6
---

**Remember to always restart JATOS after making any changes to the configuration (`./loader.sh restart`)**


### IP / domain and port

By default JATOS binds to all locally available IP addresses including 127.0.0.1 on port 9000. If you don't want to use a proxy in front of JATOS, you have several ways to configure the host name or IP address and the port:

1. It is possible to set up IP and port via `conf/production.conf`:

   * **For v3.8.1 and lower)** Edit `play.server.http.address` and `play.server.http.port`. E.g. to run on IP 192.168.0.100 and port 80:

     ~~~shell
     play.server.http.address = "192.168.0.100"
     play.server.http.port = 80
     ~~~

   * **For v3.8.2 and higher)** Edit `jatos.http.address` and `jatos.http.port`. E.g. to run on IP 192.168.0.100 and port 80:

     ~~~shell
     jatos.http.address = "192.168.0.100"
     jatos.http.port = 80
     ~~~
  
1. Via command-line arguments:

   * **For v3.8.1 and lower)** `-Dhttp.address` and `-Dhttp.port`, e.g. with the following command you'd start JATOS with IP 10.0.0.1 and port 80

     ~~~shell
     ./loader.sh start -Dhttp.address=10.0.0.1 -Dhttp.port=80
     ~~~

   * **For v3.8.2 and higher)** `-Djatos.http.address` and `-Djatos.http.port`, e.g. with the following command you'd start JATOS with IP 10.0.0.1 and port 80

     ~~~shell
     ./loader.sh start -Djatos.http.address=10.0.0.1 -jatos.Dhttp.port=80
     ~~~
   
1. (DEPRECATED) In `loader.sh` change the values of 'address' and 'port' according to your IP address or domain name and port. Restart JATOS after editing.

   ~~~shell
   address="172.16.0.1"
   port="8080"
   ~~~   


### URL base path

JATOS can be configured to use an base path. E.g we have the host "www.example.org" and let JATOS run under "mybasepath" so that JATOS' URL all start with "www.example.org/mybasepath/". This can be achieved in three ways:

1. Via the command-line argument `-DJATOS_URL_BASE_PATH`, e.g.

   ~~~shell
   ./loader.sh start -DJATOS_URL_BASE_PATH="/mybasepath/"
   ~~~

1. Via `conf/production.conf`:

   * **For v3.8.1 and lower)** change `play.http.context`, e.g.

   ~~~shell
   play.http.context = "/mybasepath/"
   ~~~

   * **For v3.8.2 and higher)** change `jatos.urlBasePath`, e.g.

   ~~~shell
   jatos.urlBasePath = "/mybasepath/"
   ~~~
   
1. Via the environment variable `JATOS_URL_BASE_PATH`, e.g.

   ~~~shell
   export JATOS_URL_BASE_PATH="/mybasepath/"
   ~~~

**The path always has to start and end with a "/".** And keep in mind that if you add a base path to JATOS' URL you have to adjust all absolute paths to the study assets (in HTML and JavaScript files) too - [or use relative paths](Adapt-pre-written-code-to-run-it-in-JATOS.html#create-the-study-in-jatos) (which is recommended anyway).


### Study assets root path

By default the study assets root folder (where all your study's HTML, JavaScript files etc. are stored) is located within JATOS installation's folder in `study_assets_root`. There are three ways to change this path:

1. Via the command-line argument `-DJATOS_STUDY_ASSETS_ROOT_PATH`, e.g.

   ~~~shell
   ./loader.sh start -DJATOS_STUDY_ASSETS_ROOT_PATH="/path/to/my/assets/root/folder"
   ~~~
   
1. Via `conf/production.conf`: change `jatos.studyAssetsRootPath`

   ~~~shell
   jatos.studyAssetsRootPath="/path/to/my/jatos_study_assets_root"
   ~~~
   
1. Via the environment variable `JATOS_STUDY_ASSETS_ROOT_PATH`, e.g. the following export adds it to the env variables:

   ~~~shell
   export JATOS_STUDY_ASSETS_ROOT_PATH="/path/to/my/assets/root/folder"
   ~~~


### MySQL Database

See [JATOS with MySQL](JATOS-with-MySQL.html)


### JVM arguments

All JVM arguments can be used with `loader.sh` but all arguments starting with `-X` need an extra suffix `-J`. The most important one is `-Xmx`, the one to limit JATOS memory usage (to change JVM's max heap memory to be precise). It has to be written as `-J-Xmx`:

```shell
./loader.sh start -J-Xmx4G   # Allow max 4 GB (heap) memory
```


### Password restrictions

By default JATOS' keeps it simple and relies on the users to choose save passwords: it just enforces a length of at least 7 characters. But this can be changed in the `conf/production.conf` with the following two properties.

* `jatos.user.password.length` - Set with an positive integer (default is 7)
* `jatos.user.password.strength` - Set to 0, 1, 2, or 3 (default is 0)
  * `0`: No restrictions on characters
  * `1`: At least one Latin letter and one number
  * `2`: At least one Latin letter, one number and one special character (`#?!@$%^&*-`)
  * `3`: At least one uppercase Latin letter, one lowercase Latin letter, one number and one special character (`#?!@$%^&*-`)


### Study result data

You can change the allowed size of a component's result data. This can be used to reduce the load on the server, especially network and database. Sometimes its necessary to increase the value if certain studies have larger result data needs. The property for this in `conf/production.conf` is `jatos.resultData.maxSize`. By default it's set to 5 MB per component run.

E.g. to reduce the allowed size per component to 1 MB:

~~~bash
jatos.resultData.maxSize = 1MB
~~~


### Uploading of study result files

There are three ways to configure the uploads:

1. Via `conf/production.conf`

   * `jatos.resultUploads.enabled` - Enables study result files uploads (default is true)
   * `jatos.resultUploads.path` - Path in the file system where the uploaded result files will be stored (default is './result_uploads')
   * `jatos.resultUploads.maxFileSize` - Max file size for one single uploaded result file (default is 30 MB)
   * `jatos.resultUploads.limitPerStudyRun` - Limit of all uploaded result files of one single study run (default is 50MB)

1. Via environment variables (JATOS_RESULT_UPLOADS_LIMIT_PER_STUDY_RUN and JATOS_RESULT_UPLOADS_MAX_FILE_SIZE)

   E.g.

   ~~~bash
   export JATOS_RESULT_UPLOADS_PATH="/path/to/my/result/upload/folder"
   export JATOS_RESULT_UPLOADS_LIMIT_PER_STUDY_RUN=100MB
   export JATOS_RESULT_UPLOADS_MAX_FILE_SIZE=50MB
   ~~~

1. Via command-line arguments (JATOS_RESULT_UPLOADS_LIMIT_PER_STUDY_RUN and JATOS_RESULT_UPLOADS_MAX_FILE_SIZE)

   E.g.

   ~~~bash
   ./loader.sh start -DJATOS_RESULT_UPLOADS_PATH="/path/to/my/result/upload/folder" -DJATOS_RESULT_UPLOADS_LIMIT_PER_STUDY_RUN=100MB -DJATOS_RESULT_UPLOADS_MAX_FILE_SIZE=50MB
   ~~~


### Study logs

There are three ways to change the configuration of the study logs:

1. Via `conf/production.conf`

   * `jatos.studyLogs.enabled` - Enables [Study Logs](Study-Log.html) (default is true)
   * `jatos.studyLogs.path` - Path in the file system where the [Study Logs](Study-Log.html) will be stored (default is './study_logs')

1. The path can be configured via environment variables

   E.g.

   ~~~bash
   export JATOS_STUDY_LOGS_PATH="/path/to/my/study/logs/folder"
   ~~~

1. The path can be configured via command-line arguments

   E.g.

   ~~~bash
   ./loader.sh start -DJATOS_STUDY_LOGS_PATH="/path/to/my/study/logs/folder"
   ~~~


### LDAP authentication

By default JATOS uses only locally stored users and no LDAP. LDAP configuration is only possible in `conf/production.conf`. At the moment LDAP users still have to be created manually in JATOS' _User manager_ (with the checkbox LDAP turned on).- only authentication is done via LDAP.

* `jatos.user.authentication.ldap.url` - Specifies URL of the LDAP server. Not set or an empty string means no authentication via LDAP.
* `jatos.user.authentication.ldap.basedn` - LDAP base DN(s) (distinguished name). Can be one DN with a single string (e.g. `"ou=students,dc=example,dc=com"`) or a list of DNs in squared brackets (e.g. `["ou=students,dc=example,dc=com", "ou=scientists,dc=example,dc=com"]`). Not set or an empty string means no authentication via LDAP.
* `jatos.user.authentication.ldap.admin.dn` - DN (distinguished name) of an (optional) admin user that has the right to search for other users. Some LDAP servers need this if it is impossible to bind directly to an 'uid'. Not set or an empty string means no admin user needed.
* `jatos.user.authentication.ldap.admin.password` - Password of the admin user
* `jatos.user.authentication.ldap.timeout` -  Time in milliseconds JATOS waits for a response from your LDAP server. Default is 5000 ms.

If your LDAP uses encryption, you have to add your certificate to JATOS' trusted certificates defined with `play.ws.ssl.trustManager.stores`. E.g. if your certificate's location is in `/jatos/conf/certs/ca.pem`, then use the following to add it:

```
play.ws.ssl.trustManager.stores = [
    { type = "PEM", path = "/jatos/conf/certs/ca.pem" }
    { path: ${java.home}/lib/security/cacerts, password = "changeit" }
]
```

The first line adds your certificate ('type' can be PKCS12, JKS or PEM). The second line adds Java's default key store.


### User session configuration

The user session is part of JATOS secuity measurments and can be configured in `conf/production.conf`. 

* `jatos.userSession.timeout` - time in minutes a user stays logged in (default is 1440 = 1 day)
* `jatos.userSession.inactivity` - defines the time in minutes a user is automatically logged out after inactivity (default is 60)


### Customize JATOS' home page

[More here](Customize-JATOS-Home-Page.html).


### Application logs

Don't confuse the application logs with the [study logs](#study-logs). The application log records messages from the JATOS application.

The application logs is by default is in JATOS installation folder under './logs' and uses daily log rotation with a history of maximal 30 days.

* Change the path (default is `./logs`)

  1. Via `conf/production.conf`: Change `jatos.logs.path`
  1. Via environment variable: Use `JATOS_LOGS_PATH`
  1. Via command-line arguments: Use `-DJATOS_LOGS_PATH`

* Change the filename (default is `application`):

  1. Via `conf/production.conf`: Change `jatos.logs.filename`
  1. Via environment variable: Use `JATOS_LOGS_FILENAME`
  1. Via command-line arguments: Use `-DJATOS_LOGS_FILENAME`

* Change the appender: If you don't want to log to a file but to `stdout` change the value to `ASYNCSTDOUT`.

  1. Via `conf/production.conf`: Change `jatos.logs.appender`
  1. Via environment variable: Use `JATOS_LOGS_APPENDER`
  1. Via command-line arguments: Use `-DJATOS_LOGS_APPENDER`


### More in _production.conf_

Some other properties can be configured in the `conf/production.conf`.

* `play.http.session.secure` - secure session cookie: set true to restrict user access to HTTPS (default is false)
* `jatos.idCookies.secure` - secure ID cookies: set true to restrict worker access to HTTPS (default is false)
* `jatos.idCookies.sameSite` - defines the ID cookies' 'SameSite' attribute: allowed values are `None`, `Lax`, or `Strict`. Default is `None`.
* `jatos.studyMembers.allowAddAllUsers` - Allow to add all users that exist on a JATOS to be added at once as members of a study. Default is false. 
* `jatos.resultData.export.useTmpFile` - If true, result data that are fetched from the database are first stored in a temporary file and only when they are all gathered the file is sent to the browser. If false the result data are streamed directly from the database to the browser. Default is false.
* `jatos.maxResultsDbQuerySize` - Maximal number of results to be fetched from the DB at once (default is 10)
* `jatos.user.authentication.oauth.googleClientId` - Activate Google Sign-In by putting your Google Client ID here (looks similar to this one "1234567890-abc123abc123.apps.googleusercontent.com")
* `jatos.user.role.allowSuperuser` - Activate [Superuser role](User-Manager.html#superusers) by putting 'true' (default is 'false')
* `jatos.studyAdmin.showStudyAssetsSize` - If set to 'false' it the 'Study Assets Size' column will be shown in the Study Admin page. Since calculating the study assets size can take some time on larger JATOS installations with slow disks, it can make sense to turn it off. Default is 'true'.
* `jatos.studyAdmin.showResultDataSize` - If set to 'false' it the 'Result Data Size' column will be shown in the Study Admin page. Since calculating the result data can take some time on larger JATOS installations with a slow database, it can make sense to turn it off. Default is 'true'.
* `jatos.studyAdmin.showResultFileSize` - If set to 'false' it the 'Result File Size' column will be shown in the Study Admin page. Since calculating the result file size can take some time on larger JATOS installations with slow disks, it can make sense to turn it off. Default is 'true'.


Apart from those all [configuration properties possible in the Play Framework](https://www.playframework.com/documentation/latest/Configuration) are possible in JATOS' _production.conf_ too, e.g. 
* `play.pidfile.path` - Path to the file that contains the process id of the started JATOS application (default is `./RUNNING_PID`) 

