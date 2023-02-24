---
title: Install JATOS on a server
slug: /JATOS-on-a-server.html
sidebar_position: 5
---

There are [several ways to bring JATOS to the internet](Bring-your-JATOS-online.html). If you don't know much about server administration the [DigitalOcean](JATOS-on-DigitalOcean.html) page might be best for you.

You can also [install JATOS via Docker](Install-JATOS-via-Docker.html).

## Installation on a server

The actual JATOS instance on a server isn't too different from a local one. It basically involves telling JATOS which IP address and port it should use and (optionally) replace the embedded database with a MySQL one. There are other issues however, not directly related to JATOS, that you should consider when setting up a server. These include: setting up automatic, regular backups of your data, an automatic restart of JATOS after a server reboot, encryption, additional HTTP server, etc.


### 1. Install Java

We've produced multiple versions of JATOS. The simplest version is JATOS alone, but other versions are bundled with Java JRE. On a server, it's best (though not necessary) to install JATOS without a bundled Java. This will make it easier to upgrade to new Java releases. Both Java 8 and 11 are fine. 


### 2. [Optional] Install MySQL

See [JATOS with MySQL](JATOS-with-MySQL.html)


### 3. Install JATOS

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

1. Check that JATOS starts with:

   ```shell
   ./loader.sh start`
   ```

   And to stop it:

   ```shell
   ./loader.sh stop`
   ```


### 4. Configuration

If JATOS runs locally it's usually not necessary to change the defaults but on a server you probably want to set up the IP and port or maybe use a different database and change the path of the study assets root folder. These docs have an extra page on how to [Configure JATOS on a Server](Configure-JATOS-on-a-Server.html).


### 5. Change Admin's password

Every JATOS installation comes with an Admin user that has the default password 'admin'. It is highly recommended to change it before the server goes live. This can be done in JATOS' GUI:

1. Start JATOS and in a browser go to JATOS login page `http://my-jatos-domain/jatos` 
1. Login as 'admin' with password 'admin'
1. Click on 'Admin (admin)' in top-right header
1. Click 'Change Password'


### 6. Check JATOS' test page

JATOS comes with a handy test page: in the browser go to `http://my-jatos-domain/jatos/admin`, then click _Tests_ and check that all tests are 'OK'.


### 7. [Optional] Proxy and encryption

Most admins tend to use an additional reverse proxy in front of JATOS, mostly for encryption. We provide two example configurations for Nginx and Apache. Both support encryption and WebSockets (keep in mind JATOS relies on WebSockets and it's necessary to support them).

* [JATOS with Nginx](JATOS-with-Nginx.html)
* [JATOS with Apache](JATOS-with-Apache.html)


### 8. [Optional] Turn on user session validation

[More here](Configure-JATOS-on-a-Server.html#user-session-configuration).


### 9. [Optional] Auto-start JATOS via systemd

It's nice to have JATOS start automatically after a start or a reboot of your machine.

Create a systemd service file for JATOS. E.g. with vim:

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

Secondly, notify systemd of the new service file:

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


### 10. [Optional] Backup

The easiest way to backup is to let JATOS users care themselves for their own data. JATOS has an easy to use [export function for result data](Manage-results.html). So you could just tell everyone to export their data regularily.

But if you want to set up a regular backup of the data stored in JATOS here are the necessary steps. Those data consists of several parts and all have to be backed up to be able to fully restore JATOS later.

#### Simple

If you want to keep it simple and you didn't change any of the folder paths then you can just back up the whole JATOS folder. But remember, if you use the embedded H2 database, to turn off JATOS before doing the backup. And if you use MySQL you have to care for the MySQL backup extra.

#### Detailed

What has to be backed up in detail:

1. **Database**
    * **MySQL** - If you use a MySQL database you might want to look into the `mysqldump` shell command. E.g., with `mysqldump -u myusername -p mydbname > mysql_bkp.out` you can backup the whole data into a single file. Restore the database with `mysql -u myusername -p mydbname < mysql_bkp.out`.
    * **H2** - There are at least two ways: one easy (but unofficial) and one official:
      1. Copy & paste the db file - **It's important to stop JATOS before doing a backup or restoring a H2 database** this way. If you do not stop JATOS your [data might be corrupted](Troubleshooting.html#database-is-corrupted). You can just backup the folder `my-jatos-path/database`.
      1. Via [H2's upgrade, backup, and restore tool](http://www.h2database.com/html/tutorial.html#upgrade_backup_restore)

1. **study_assets_root folder** - This is the folder where all the study's assets (e.g. HTML, JS, CSS, images) are stored.

1. **result_uploads folder** - This folder contains the files, that were uploaded during study runs.

1. **study_logs folder** - Contains the [study logs](Study-Log.html).

