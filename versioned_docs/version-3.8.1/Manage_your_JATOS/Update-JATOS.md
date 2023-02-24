---
title: Update JATOS
slug: /Update-JATOS.html
sidebar_position: 3
---

**If you want to update a JATOS server please read [this page](/Updating-a-JATOS-server-installation.html) first.**

We'll periodically update JATOS with new features and bug fixes. We recommend you stay up to date with the [latest release](https://github.com/JATOS/JATOS/releases). However if you are currently running a study it's always safest to keep the same JATOS version throughout the whole experiment.


## Automatic Update (recommended)

You can update your JATOS automatically (if you have **admin rights** and running on **Mac OS** or **Linux** (including **Docker**), that is). **Windows is not yet supported**.

### Normal process

The process is pretty self-explanatory, but anyway, we'll explain it here in detail:

1. You will get a notification on your JATOS' _Administration_ page.

   ![Update notification Schreenshot](/img/autoupdate-notification.png)

1. We expect no problems, but we recommend that you **back up your result data, result files, study assets folder and study logs** before continuing.
1. Click on _Update_, confirm that you want to continue and the latest JATOS version will be downloaded from GitHub and saved in your system's temporary folder. The download might take a while depending on your internet connection.
1. After download is complete, you will be asked again for confirmation. Optionally you can do a **backup**: JATOS will copy the content of its own installation folder into a folder with the name _backup_x.x.x_ (x.x.x is the version before the update). This will usually include your embedded H2 database, your study assets and logs - **but not your MySQL database** (should you have one). If anything goes wrong in the auto-update, you have everything in this backup folder to start the old JATOS again. This backup will use up disk space (that is why it is not selected by default).

   ![Update notification Schreenshot](/img/autoupdate-update-and-restart.png)

1. After clicking the _Go on_ button, JATOS will stop itself, replace its program files and re-start itself again. This might take up to a minute.
1. Refresh your JATOS home page every now and then until you see your updated JATOS' login screen again.
1. Check the new JATOS with the build-in tests: go to _Administration_ ⇒ _Tests_ and check that all tests are 'OK'.

---

JATOS uses Java 11 - older versions use Java 8. Future versions will likely require newer Java versions. If you're updating from a JATOS version using Java 8 to (say) another version using Java 11, the auto-update process will automatically download JATOS bundled with the new Java, regardless of wich variant you are currently using. If you do not like the bundled Java and use your own version you can always remove the folder _jre_ later on after the update.

---


### Specify a version

Sometimes, for whatever reasons, JATOS doesn't autmatically detect new versions then you can still start the update by specifying the version.

**It is usually destructive to update JATOS to a lower version than is currently installed. It's highly recommended to use a higher version (or the same). Use at your own risk.**

The parameter `version` can be added to the JATOS administration page's URL. It takes the version tag as specified in [GitHub](https://github.com/JATOS/JATOS/releases) and enforces an update to this version. E.g. if your domain is `my.jatos.org` and the version you want to update to is `v3.7.4` (don't forget the 'v'), than the URL for your browser is `https://my.jatos.org/jatos/admin?version=v3.7.4`. The rest of the update procedure is like the [Normal Process](#normal-process): you will be ask for conirmation twice.


## Manual Update

To be absolutely safe you can install the new JATOS version and keep the old one untouched. This way you can switch back if something fails. Just remember that only one JATOS can run at the same time. Always stop your old JATOS instance before starting another one.

You can update your local JATOS instance in two main ways (The procedure is a little different if you want to [update JATOS on a server installation](Updating-a-JATOS-server-installation.html)):
 

### First, easy way: discarding your result data

If you don't care about result data stored in JATOS:

1. Export any studies you wish to keep from the old JATOS installation.
1. Download and install the new version as if it were a new fresh download. Don't start it yet.
1. Stop the old JATOS and start the new JATOS.
1. Import all the studies your previously exported. This will transfer the files and subfolders in your study's asset folder (HTML, JavaScript, CSS files). 

**What will be transferred:**

1. Files and subfolders in study's assets folder
1. All your studies' and components' properties
1. The **properties** of the first (Default) batch
 
**What will be lost:**

1. **All result data will be lost**
1. All workers in all batches (including Default batch)
1. All batches other than the Default batch
1. All study logs


### Second way: keeping everything (including your result data)

If you do want to keep your studies, batches, and your result data you'll have to move them to the new JATOS. 

1. Stop JATOS (on Unix systems, type `./loader.sh stop` on the terminal. On Windows MS, close your command window)
1. Go to the folder of your old JATOS installation. From there copy your assets root folder to the new JATOS installation (Note: By default your assets root folder is called `study_assets_root` and lays in the JATOS folder but you might have changed this. You can find the location and name in `conf/production.conf`. It is specified in the line beginning with `jatos.studyAssetsRootPath=`.)
1. Go to the folder of your old JATOS installation. From there copy your folder of your uploaded result files to the new JATOS installation (Note: By default this folder is called `result_uploads` and lays in the JATOS folder but you might have changed this. You can find the location and name in `conf/production.conf`. It is specified in the line beginning with `jatos.resultUploads.path=`.)
1. From the folder of your old JATOS installation copy the folders `database` and `study_logs` to the folder of the new JATOS installation.
1. If you had changed the `conf/production.conf` file in your old JATOS instance (for example to set a custom location for your `study_assets_root` folder) you'll have to do this again in the new JATOS version. We recommend re-editing the new version of the file, rather than just overwriting the new with the old version, in case anything in the `production.conf` file has changed.
1. Start the new JATOS (on Unix systems, type `./loader.sh start` on the terminal. On Windows double click the `loader.bat`)
1. Check the build-in tests: go to _Administration_ ⇒ _Tests_ and check that all tests are 'OK'.

**What will be transferred:**

1. Files and subfolders in study assets folder
1. All your study and components properties
1. All batches, together with their workers, generated links, and results
1. All study logs

**What will be lost:**
nothing
