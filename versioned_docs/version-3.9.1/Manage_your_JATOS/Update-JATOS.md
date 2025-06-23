---
title: Update JATOS
slug: /Update-JATOS.html
sidebar_position: 3
---

We periodically update JATOS with new features and bug fixes. We recommend you stay up to date with the [latest release](https://github.com/JATOS/JATOS/releases). However, if you are currently running a study, it's always safest to keep the same JATOS version throughout the entire experiment.

**Please make backups before updating.**

**Be aware: JATOS only allows updates to higher version numbers—downgrading will likely break your installation.**

There are more details about updating in their respective pages:

* [Update JATOS running on a server](/JATOS-on-a-server.html#update-jatos)
* [Update JATOS running in a Docker container](/Install-JATOS-via-Docker.html#updating-jatos-with-docker)
* [Update JATOS running with Docker Compose](/JATOS-with-Docker-Compose.html#updating-jatos-with-docker-compose)
* [Update JATOS running with Kubernetes](/JATOS-in-a-cluster.html#updating-jatos-with-kubernetes)

## Automatic Update

This is the recommended update method for JATOS running locally or on a simple server (but not in a cluster).

You can update your JATOS automatically if you have **admin rights** and are running on **macOS** or **Linux**. **Windows is not yet supported**.

The process is pretty self-explanatory, but we'll explain it here in detail:

1. You will get a notification on your JATOS _Administration_ page.

   ![Update notification Screenshot](/img/v39x/autoupdate-notification.png)

   Sometimes your JATOS is not able to receive data about new releases. Often, a restart of the JATOS application helps in this case. If this still persists and you know there is a new release that you would like to update to, you can still [start the update by specifying the version](/Update-JATOS.html#auto-update-to-a-specific-version).

2. Click on _Update_, confirm that you want to continue, and the latest JATOS version will be downloaded from GitHub and saved in your system's temporary folder. The download might take a while depending on your internet connection.

   ![Update notification Screenshot](/img/v39x/autoupdate-confirmation.png)

3. After the download is complete, you will be asked again for confirmation.

   ![Update notification Screenshot](/img/v39x/autoupdate-update-and-restart.png)

4. After clicking the _Go on_ button, JATOS will stop itself, replace its program files, and restart itself. This might take some time depending on the new version and your machine's resources, but usually it's done within 2 minutes. Refresh your JATOS home page every now and then until you see your updated JATOS login screen again.

5. Check the new JATOS with the built-in tests: go to _Administration_ ⇒ _Tests_ and check that all tests are 'OK'.

### (Auto-)Update to a Specific Version

Sometimes, for whatever reason, JATOS doesn't automatically detect new versions. You can still start the update by specifying the version.

**It is usually destructive to update JATOS to a lower version than is currently installed. It is highly recommended to use a higher version (or the same). Use at your own risk.**

The URL of the JATOS administration page accepts the query parameter `version`. This parameter takes the JATOS version as specified in [GitHub](https://github.com/JATOS/JATOS/releases) and enforces an update to this version.

For example, if the version you want to update to is `v3.9.1` (don't forget the 'v') and your domain is `my.jatos.org`, then the URL for your browser is:

```
https://my.jatos.org/jatos/admin?version=v3.9.1
```

The rest of the update procedure is the same as in the normal automatic update: you will be asked for confirmation twice.

---

JATOS uses Java 11—older versions use Java 8. Future versions will likely require newer Java versions. If you're updating from a JATOS version using Java 8 to (say) another version using Java 11, the auto-update process will automatically download JATOS bundled with the new Java, regardless of which variant you are currently using. If you do not want the bundled Java and prefer to use your own version, you can always remove the _jre_ folder after the update.

---

## Manual Update

The automatic update is the preferred way, but if, for whatever reason, you do not trust JATOS' automatic update or it does not work for you (e.g., you run a server on Windows), you can still update JATOS manually.

You can update your JATOS manually in two main ways:  
1) Easy, but discards all results  
2) Not so easy, but keeps everything

### Easy, but Discards Results

If you don't care about result data stored in JATOS:

1. Export any studies you wish to keep from the old JATOS installation.
2. Download and install the new version as if it were a new, fresh installation. Don't start it yet.
3. Stop the old JATOS and start the new JATOS.
4. Import all the studies you previously exported. This will transfer the files and subfolders in your study's asset folder (HTML, JavaScript, CSS files).

**What will be transferred:**

- Files and subfolders in the study assets root folder
- All your studies' and components' properties
- The **properties** of the first (Default) batch

**What will be lost:**

- **All result data and files will be lost**
- All workers in all batches (including Default batch)
- All batches other than the Default batch
- Any configuration you did in _jatos.conf_
- All study logs

### Not So Easy, but Keeps Everything

JATOS stores its state in several folders in the file system and a database, and you will have to transfer everything to the new, updated JATOS.

* The **_study assets root_ folder** stores all your study's files (e.g., HTML, JS, CSS, images). By default, it's in your JATOS folder and is named _study_assets_root_.
* The **_result uploads_ folder** stores all your study result files. By default, it is in your JATOS folder and is named _result_uploads_.
* The **_study logs_ folder** stores all your study logs. By default, it is in your JATOS folder and is named _study_logs_.
* JATOS' **_application logs_** are stored by default in your JATOS folder under a folder named _logs_.
* If you use the **_embedded database_**, all its data is, by default, stored in a folder called _database_ within your JATOS folder.
* If you use a **_MySQL/MariaDB database_**, your data are stored there and you only have to configure the updated JATOS to use this database.
* You might have configured JATOS by changing its **_jatos.conf_ file**. By default, it is in the JATOS installation folder in the _conf_ directory.

**Then the update procedure is:**

1. Stop JATOS.
2. Download and install the new version as if it were a new, fresh installation. Don't start it yet.
3. From the folder of your old JATOS installation, copy the **_study assets root_ folder**, **_result uploads_ folder**, **_study logs_ folder**, **_application logs_ folder**, the **_database_ folder** (if you do not use MySQL/MariaDB), and the **_jatos.conf_** into the folder of your new, updated JATOS.
4. Start the new JATOS.

**What will be transferred:**

- All study assets
- All your study and component properties
- All batches, together with their workers and generated study links
- All result data and files
- All study logs
- All logs
- JATOS' configuration (as long as it is done in the configuration file)

**What will be lost:**  
Nothing