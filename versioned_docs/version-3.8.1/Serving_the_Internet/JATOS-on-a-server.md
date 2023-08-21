---
title: Install JATOS on a server
slug: /JATOS-on-a-server.html
sidebar_position: 3
---

There are [several ways to bring JATOS to the internet](Bring-your-JATOS-online.html). If you don't know much about server administration the [DigitalOcean](JATOS-on-DigitalOcean.html) page might be best for you.

And there are dedicated pages for [installation with Docker](/Install-JATOS-via-Docker.html) and [Docker Compose](/JATOS-with-Docker-Compose.html).

Installing JATOS as a Internet server usually involves exchanging the embedded database with a MySQL/MariaDB one and setting up a reverse proxy (mostly for HTTPS). You should also consider automatic and regular backups of the data stored in your JATOS.


## Install Java

JATOS needs Java 8 or 11 to run (17 is not yet supported). You can install your own Java or get a JATOS that is already bundled with Java. 


## Install JATOS

1. [Download JATOS](https://github.com/JATOS/JATOS/releases)

   E.g. the latest release:

   ```shell
   wget https://github.com/JATOS/JATOS/releases/latest/download/jatos.zip
   ```

   E.g. or a certain version (exchange x.x.x with the version you want):
   
   ```shell
   wget https://github.com/JATOS/JATOS/releases/download/vx.x.x/jatos.zip
   ```

1. JATOS comes zipped. Unpack this file at a location in your server's file system where JATOS should be installed:

   ```shell
   unzip jatos.zip
   ```

1. Check that the file `loader.sh` in the JATOS folder is executable. If not:

   ```shell
   chmod u+x loader.sh
   ```

1. Run JATOS:

   ```shell
   ./loader.sh start
   ```

   And to stop it:

   Usually `Ctr+C` does the job, but if your JATOS runs in the background:

   ```shell
   ./loader.sh stop
   ```

1. Check JATOS is running correctly:

   Use curl: `curl http://localhost:9000/ping` should give you `pong` back
   
   If you can already access your server from the outside, open JATOS in a browser (the default port is 9000): `http://my-IP-or-domain:9000`. It should show the JATOS login screen. You can log in with username _admin_ and password _admin_.
   
   Check JATOS' _Administration_ page: `http://my-IP-or-domain/jatos/admin`. Click the _Tests_ button: all tests should show an 'OK'. Click on  _System Info_ and check that all is like you configured it.

1. **Always change _admin_'s password**

   This can be done in JATOS' GUI:

   1. In a browser go to JATOS' login page `http://my-IP-or-domain/jatos` 
   1. Log in as 'admin' with password 'admin'
   1. Click on _Admin (admin)_ in top-right header
   1. Click _Change Password_


## [Optional] Install MySQL/MariaDB

See [JATOS with MySQL](JATOS-with-MySQL.html)


## Configuration

These docs have an extra page on [JATOS Configuration](JATOS_Configuration.html).


## [Optional] Proxy and encryption

Most admins tend to use an additional reverse proxy in front of JATOS, mostly for encryption. We provide two example configurations for Nginx and Apache. Both support encryption and WebSockets (keep in mind JATOS relies on WebSockets and it's necessary to support them).

* [JATOS with Nginx](JATOS-with-Nginx.html)
* [JATOS with Apache](JATOS-with-Apache.html)


## [Optional] Auto-start JATOS via _systemd_

It's nice to have JATOS start automatically after a start or a reboot of your machine.

Create a _systemd_ service file for JATOS. E.g. with _vim_:

```shell
vim /etc/systemd/system/jatos.service
```

and put the following text inside (but change the JATOS path and the user under which you want to start JATOS):

```shell
[Unit]
Description=JATOS
After=network-online.target
# If you use JATOS with an MySQL database use
#After=network-online.target mysql.service

[Service]
PIDFile=/my/path/to/jatos/RUNNING_PID
User=my-jatos-user
ExecStart=/my/path/to/jatos/loader.sh start
ExecStop=/bin/kill $MAINPID
ExecStopPost=/bin/rm -f /my/path/to/jatos/RUNNING_PID
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Secondly, notify _systemd_ of the new service file:

```shell
systemctl daemon-reload
```

and enable it, so it runs on boot:

```shell
systemctl enable jatos.service
```

That's it.

Additionally you can manually start/stop JATOS now with:
* `systemctl start jatos.service`
* `systemctl stop jatos.service`
* `systemctl restart jatos.service`
* `systemctl status jatos.service`

You can disable the service with `systemctl disable jatos.service`. If you change the service file you need to do `systemctl daemon-reload jatos.service` again to let the system know.


## [Optional] Specify the location of JATOS' data folders

By default all data folders are located in JATOS installation folder. But sometimes it is better to change the location to better suit your needs, e.g. for easier backups or updates.  

JATOS' data folders (and their path configuration):
* [_study assets root_ folder](/JATOS_Configuration.html#study-assets-root-path)
* [_result uploads_ folder](/JATOS_Configuration.html#result-file-uploading)
* [_study logs_ folder](/JATOS_Configuration.html#study-logs)

One might want to move all data folders in one extra 'data' folder. E.g. in JATOS' **config file** the following properties have to be set:

~~~shell
jatos.studyAssetsRootPath = "/path/to/my/jatos-data-folder/study_assets_root"
jatos.resultUploads.path =  "/path/to/my/jatos-data-folder/result_uploads"
jatos.studyLogs.path =      "/path/to/my/jatos-data-folder/study_logs"
~~~

Or with **command-line** arguments this would be:

```shell
-Djatos.studyAssetsRootPath="/path/to/my/jatos-data-folder/study_assets_root" -Djatos.resultUploads.path="/path/to/my/jatos-data-folder/result_uploads" -Djatos.studyLogs.path="/path/to/my/jatos-data-folder/study_logs"
```


## [Optional] Backup

The easiest way to backup is to let JATOS users care themselves for their own data. JATOS has an easy to use [export function for result data](Manage-results.html). So you could just tell everyone to export their data regularly.

But if you want to set up a regular backup of the data stored in JATOS here are the necessary steps. Those data consists of several parts and all have to be backed up to be able to fully restore JATOS later.

### Simple

If you want to keep it simple and you didn't change any of the [data folder paths](/JATOS-on-a-server.html#optional-specify-the-location-of-jatos-data-folders) then you can just back up the whole JATOS folder. But remember, if you use the embedded H2 database, to stop JATOS before doing the backup. And if you use MySQL you have to care for the MySQL backup extra.

### Detailed

1. JATOS data folders

   JATOS has a couple of [_data_ folders](/JATOS-on-a-server.html#optional-specify-the-location-of-jatos-data-folders). For easier backups it makes sense to have them all in one extra 'data' folder. Then you can just backup this 'data' folder with whatever file backup mechanism suits you best.

1. Backup MySQL/MariaDB

   If you use a MySQL or MariaDB database you might want to look into the `mysqldump` shell command. E.g., with `mysqldump -u myusername -p mydbname > mysql_bkp.out` you can backup the whole data into a single file. Restore the database with `mysql -u myusername -p mydbname < mysql_bkp.out`.

1. Backup H2 database

   There are at least two ways to backup an embedded H2 database: one easy (but unofficial) and one official:

   * Easy way: Just backup the _database_ folder in your JATOS installation folder. **But it is important to stop JATOS before doing a backup or restoring a H2 database** this way. If you do not stop JATOS your data might get corrupted.

   * Official way: Use [H2's upgrade, backup, and restore tool](http://www.h2database.com/html/tutorial.html#upgrade_backup_restore)


## Update JATOS

**Be aware**: JATOS is only allowed to update to higher version numbers - downgrading will likely break your installation. Please do backups before updating.

There are two possibilities to update JATOS running on a server:

1. You can simply use the [auto-update feature](/Update-JATOS.html#automatic-update).

1. If you specified an extra ['data' folder](/JATOS-on-a-server.html#optional-specify-the-location-of-jatos-data-folders) you can install a new JATOS without starting it yet, stop the current JATOS, configure the new one to use your extra 'data' folder and start it.