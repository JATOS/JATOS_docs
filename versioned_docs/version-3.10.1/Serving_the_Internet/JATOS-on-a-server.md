---
title: Install JATOS on a server
slug: /JATOS-on-a-server.html
sidebar_position: 3
---

There are [several ways to bring JATOS online](Bring-your-JATOS-online.html). If you don't have much experience with server administration, the [DigitalOcean](JATOS-on-DigitalOcean.html) page might be best for you.

There are also dedicated pages for [installation with Docker](/Install-JATOS-via-Docker.html) and [Docker Compose](/JATOS-with-Docker-Compose.html).

Installing JATOS as an Internet server usually involves replacing the embedded database with MySQL/MariaDB and setting up a reverse proxy (mainly for HTTPS). You should also consider automatic and regular backups of the data stored in your JATOS.

## Install Java

JATOS requires Java 11 to run (higher versions are not yet supported). You can install your own Java or download a JATOS version that is already bundled with Java.

## Install JATOS

1. [Download JATOS](https://github.com/JATOS/JATOS/releases)

   Example for the latest release:
   ```shell
   wget https://github.com/JATOS/JATOS/releases/latest/download/jatos.zip
   ```

   Or for a specific version (replace x.x.x with the version you want):
   ```shell
   wget https://github.com/JATOS/JATOS/releases/download/vx.x.x/jatos.zip
   ```

2. Unpack the zip file at your desired installation location:
   ```shell
   unzip jatos.zip
   ```

3. Ensure the `loader.sh` file in the JATOS folder is executable. If not:
   ```shell
   chmod u+x loader.sh
   ```

4. Start JATOS:
   ```shell
   ./loader.sh start
   ```
   To stop it:
   - Usually `Ctrl+C` does the job, but if JATOS runs in the background:
     ```shell
     ./loader.sh stop
     ```

5. **Check that JATOS is running correctly:**
   - Use curl: `curl http://localhost:9000/ping` should return `pong`.
   - If your server is accessible from the outside, open JATOS in a browser (default port is 9000): `http://my-IP-or-domain:9000`. You should see the JATOS login screen. Log in with username _admin_ and password _admin_.
   - Check JATOS' _Administration_ page: `http://my-IP-or-domain/jatos/admin`. Click the _Tests_ button: all tests should show 'OK'. Click on _System Info_ and verify your configuration.

6. **Always change the _admin_ password:**
   - In your browser, go to JATOS' login page: `http://my-IP-or-domain/jatos`
   - Log in as 'admin' with password 'admin'
   - Click on _Admin (admin)_ in the top-right header
   - Click _My Password_ to change it

## [Optional] Install MySQL/MariaDB

See [JATOS with MySQL](JATOS-with-MySQL.html).

## Configuration

See the [JATOS Configuration](JATOS_Configuration.html) page for more options, such as enabling user authentication with ORCID, OpenID Connect (OIDC), LDAP, or Google Sign-in.

## [Optional] Proxy and Encryption

Most admins use a reverse proxy in front of JATOS, mainly for encryption. We provide example configurations for both Nginx and Apache. Both support encryption and WebSockets (JATOS relies on WebSockets, so support is necessary).

* [JATOS with Nginx](JATOS-with-Nginx.html)
* [JATOS with Apache](JATOS-with-Apache.html)

## [Optional] Auto-start JATOS via _systemd_

To have JATOS start automatically after a reboot, create a _systemd_ service file. For example, with _vim_:

```shell
vim /etc/systemd/system/jatos.service
```

Add the following (adjust the JATOS path and user as needed):

```shell
[Unit]
Description=JATOS
After=network-online.target
# If you use JATOS with MySQL, use:
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

Reload systemd and enable the service:

```shell
systemctl daemon-reload
systemctl enable jatos.service
```

You can now manually control JATOS with:
* `systemctl start jatos.service`
* `systemctl stop jatos.service`
* `systemctl restart jatos.service`
* `systemctl status jatos.service`

Disable the service with `systemctl disable jatos.service`. If you change the service file, run `systemctl daemon-reload` again.

## [Optional] Specify the Location of JATOS' Data Folders

By default, all data folders are in the JATOS installation folder. You may want to change their location for easier backups or updates.

JATOS' data folders (and their path configuration):
* [_study assets root_ folder](/JATOS_Configuration.html#study-assets-root-path)
* [_result uploads_ folder](/JATOS_Configuration.html#result-file-uploading)
* [_study logs_ folder](/JATOS_Configuration.html#study-logs)

To move all data folders to a single 'data' directory, set these properties in your config file:

~~~shell
jatos.studyAssetsRootPath = "/path/to/my/jatos-data-folder/study_assets_root"
jatos.resultUploads.path =  "/path/to/my/jatos-data-folder/result_uploads"
jatos.studyLogs.path =      "/path/to/my/jatos-data-folder/study_logs"
~~~

Or with command-line arguments:

```shell
-Djatos.studyAssetsRootPath="/path/to/my/jatos-data-folder/study_assets_root" -Djatos.resultUploads.path="/path/to/my/jatos-data-folder/result_uploads" -Djatos.studyLogs.path="/path/to/my/jatos-data-folder/study_logs"
```

## [Optional] Backup

The easiest way to back up is to have JATOS users export their own data using the [export function for result data](Manage-results.html). Encourage everyone to export their data regularly.

If you want to set up regular backups for all JATOS data, you need to back up several parts to fully restore JATOS later.

### Simple

If you haven't changed any [data folder paths](/JATOS-on-a-server.html#optional-specify-the-location-of-jatos-data-folders), you can simply back up the whole JATOS folder. If you use the embedded H2 database, **stop JATOS before backing up**. If you use MySQL, back up the MySQL database separately.

### Detailed

1. **JATOS data folders:**  
   It's easiest to have all [_data_ folders](/JATOS-on-a-server.html#optional-specify-the-location-of-jatos-data-folders) in one directory. Then you can back up this directory with your preferred file backup tool.

2. **Backup MySQL/MariaDB:**  
   Use the `mysqldump` command. For example:
   ```shell
   mysqldump -u myusername -p mydbname > jatos_bkp.sql
   ```
   Restore with:
   ```shell
   mysql -u myusername -p mydbname < jatos_bkp.sql
   ```

3. **Backup H2 database:**  
   There are two ways:
   - **Easy (but unofficial):** Back up the _database_ folder in your JATOS installation. **Stop JATOS before backing up or restoring the H2 database** this way, or your data may be corrupted.
   - **Official:** Use [H2's upgrade, backup, and restore tool](http://www.h2database.com/html/tutorial.html#upgrade_backup_restore).

## Update JATOS

**Note:** JATOS only allows updates to higher version numbers—downgrading will likely break your installation. Always back up before updating.

There are two ways to update JATOS running on a server:

1. Use the [auto-update feature](/Update-JATOS.html#automatic-update).
2. If you specified a separate ['data' folder](/JATOS-on-a-server.html#optional-specify-the-location-of-jatos-data-folders), you can install a new JATOS (without starting it yet), stop the current JATOS, configure the new one to use your data folder, and then start it.