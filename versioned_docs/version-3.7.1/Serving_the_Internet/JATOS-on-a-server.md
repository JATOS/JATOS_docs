---
title: Install JATOS on a server
slug: /JATOS-on-a-server.html
sidebar_position: 5
---

There are several ways to bring JATOS to the internet. You can install it

* On your own **dedicated server** (discussed here on this page)
* In the **cloud** - This point is covered by two pages, [one for DigitalOcean](JATOS-on-DigitalOcean.html) and [one for AWS](JATOS-in-Amazons-Cloud-without-Docker.html) (also there are other cloud provider, like Microsoft Azure, Google Cloud ...).
* With a **Docker** container: [Install JATOS via Docker](Install-JATOS-via-Docker.html)

If you don't know much about server administration the DigitalOcean page might be best for you.


## Installation on a server

The actual JATOS instance on a server isn't too different from a local one. It basically involves telling JATOS which IP address and port it should use and (optionally) replace the embedded database with a MySQL one. There are other issues however, not directly related to JATOS, that you should consider when setting up a server. These include: setting up automatic, regular backups of your data, an automatic restart of JATOS after a server reboot, encryption, additional HTTP server, etc.


### 1. Install Java

We've produced multiple versions of JATOS. The simplest version is JATOS alone, but other versions are bundled with Java JRE. On a server, it's best (though not necessary) to install JATOS without a bundled Java. This will make it easier to upgrade to new Java releases. Both Java 8 and 11 are fine. 


### 2. [Optional] Install MySQL

See [JATOS with MySQL](JATOS-with-MySQL.html)


### 3. Install JATOS

1. [Download JATOS](https://github.com/JATOS/JATOS/releases)

   E.g. with _wget_ for the version 3.7.1:
   
   `wget https://github.com/JATOS/JATOS/releases/download/v3.7.1/jatos.zip`

1. JATOS comes zipped. Unpack this file at a location in your server's file system where JATOS should be installed.

1. Check that the file `loader.sh` in the JATOS folder is executable.

1. Check that JATOS starts with `loader.sh start|restart|stop`


### 4. Configuration

If JATOS runs locally it's usually not necessary to change the defaults but on a server you probably want to set up the IP and port or maybe use a different database and change the path of the study assets root folder. These docs have an extra page on how to [Configure JATOS on a Server](Configure-JATOS-on-a-Server.html).


### 5. Change Admin's password

Every JATOS installation comes with an Admin user that has the default password 'admin'. You must change it before the server goes live. This can be done in JATOS' GUI:

1. Start JATOS and in a browser go to JATOS login page `http://my-jatos-domain/jatos` 
1. Login as 'admin' with password 'admin'
1. Click on 'Admin (admin) in top-right header
1. Click 'Change Password'


### 6. Check JATOS' test page

JATOS comes with a handy test page: in the browser go to `http://my-jatos-domain/jatos/admin`, then click _Tests_ and check that all tests are 'OK'.


### 7. [Optional] Proxy and encryption

Most admins tend to use an additional reverse proxy in front of JATOS, mostly for encryption. We provide two example configurations for Nginx and Apache. Both support encryption and WebSockets (keep in mind JATOS relies on WebSockets and it's necessary to support them).

* [JATOS with Nginx](JATOS-with-Nginx.html)
* [JATOS with Apache](JATOS-with-Apache.html)


### 8. [Optional] Turn on user session validation

[More here](Configure-JATOS-on-a-Server.html#user-session-configuration).


### 9. [Optional] Auto-start JATOS

It's nice to have JATOS starts automatically after a start or a reboot of your machine. Choose between one of the two possibilities: 1) via a systemd service, or 2) via a init.d script.


#### 1) Via systemd service 

Create a systemd service file for JATOS 
```shell
vim /etc/systemd/system/jatos.service
```
and put the following text inside. 
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
Change the paths and the user according to your JATOS path and the user you want to start JATOS with.

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

You can disable the service with `systemctl disable jatos.service`. If you change the service file you need `systemctl daemon-reload jatos.service` to let the system know.


#### 2) Via /etc/init.d script
It's easy to turn the `loader.sh` script into an init script for a daemon.

1. Copy the `loader.sh` script to `/etc/init.d/`
1. Rename it to `jatos`
1. Change access permission with `chmod og+x jatos`
1. Edit `/etc/init.d/jatos`
   1. Comment out the line that defines the JATOS location `dir="$( cd "$( dirname "$0" )" && pwd )"`
   1. Add a new locatoin `dir=` with the path to your JATOS installation

      The beginning of your `/etc/init.d/jatos` should look like:
  
      ~~~ shell
      #!/bin/bash
      # JATOS loader for Linux and MacOS X
      
      # Change IP address and port here
      # Alternatively you can use command-line arguments -Dhttp.address and -Dhttp.port
      address="127.0.0.1"
      port="9000"
      
      # Don't change after here unless you know what you're doing
      ###########################################################

      # Get JATOS directory
      #dir="$( cd "$( dirname "$0" )" && pwd )"
      dir="/path/to/my/JATOS/installation"
      ...
      ~~~
  
1. Make it auto-start with the command `sudo update-rc.d jatos defaults`

Now JATOS starts automatically when you start your server and stops when you shut it down. You can also use the init script yourself like any other init script with `sudo /etc/init.d/jatos start|stop|restart`.


### 10. [Optional] Backup

The easiest way to backup is to let JATOS users care themselves for their own data. JATOS has an easy to use [export function for result data](Manage-results.html). So you could just tell everyone to export their data regularily.

But if you want to set up a regular backup of the data stored in JATOS here are the necessary steps. Those data consists of two parts (1.) the data stored in the database and (2.) your study assets folder that contains all the web files (e.g. HTML, JavaScript, images). Both have to be backed up to be able to restore them later on.

1. **Database**
    * **MySQL** - If you use a MySQL database you might want to look into the `mysqldump` shell command. E.g., with `mysqldump -u myusername -p mydbname > mysql_bkp.out` you can backup the whole data into a single file. Restore the database with `mysql -u myusername -p mydbname < mysql_bkp.out`.
    * **H2** - There are at least two ways: one easy (but unofficial) and one official:
      1. Copy & paste the db file - It's important to **stop JATOS** before doing a backup or restoring a H2 database this way. If you do not stop JATOS your [data might be corrupted](Troubleshooting.html#database-is-corrupted). You can just backup the folder `my-jatos-path/database`. In case you want to restore an older version from the backup just replace the current version of the folder with the backed-up version.
      1. Via [H2's upgrade, backup, and restore tool](http://www.h2database.com/html/tutorial.html#upgrade_backup_restore)

1. **study_assets_root folder** - This is the folder where all your study's assets (e.g. HTML, JS, CSS, images) are stored. You can just make a backup of your study assets folder. If you want to return to a prior version replace the current folder with the backed-up version.

1. **result_uploads folder** - This folder contains the files, that were uploaded during a study run. You can just make a backup of your results upload folder. If you want to return to a prior version replace the current folder with the backed-up version.

1. **study_logs folder** - Contains the [study logs](Study-Log.html)

Remember, a backup has to be done of all **four** the folders, _database_ **and** the _study_assets_root_ **and** _result_uploads_ **and** _study_logs_.
