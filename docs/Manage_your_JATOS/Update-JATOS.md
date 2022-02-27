---
title: Update JATOS
slug: /Update-JATOS.html
sidebar_position: 3
---
import Hl from '@site/src/components/Highlight';

**If you want to update a JATOS server please read [this page](/Updating-a-JATOS-server-installation.html) first.**

We'll periodically update JATOS with new features and bug fixes. We recommend you stay up to date with the [latest release](https://github.com/JATOS/JATOS/releases). However if you are currently running a study it's always safest to keep the same JATOS version throughout the whole experiment.


## Automatic Update (recommended)

You can update your JATOS automatically (if you have **admin rights** and running on **Mac OS** or **Linux** (including **Docker**), that is). **Windows is not yet supported**.

### Normal process

The process is pretty self-explanatory, but anyway, we'll explain it here in detail:

1. You will get a notification on your JATOS' <Hl>Administration</Hl> page.

   ![Update notification Schreenshot](/img/autoupdate-notification.png)

1. We expect no problems, but sh&t happens. We recommend that you **back up your result data, result files, study assets folder and study logs** before continuing.
1. Click on <Hl>Update</Hl>, confirm that you want to continue and the latest JATOS version will be downloaded from GitHub and saved in your system's temporary folder. Usually the variant downloaded will be the one without bundled Java. Only in cases where JATOS switches to a newer version of Java a bundled version is required [(see below)](#Versions-with-newer-Java-required). The download might take a while depending on your internet connection.
1. After download is complete, you will be asked again for confirmation. By default, JATOS will **back up**: it will copy the content of its own installation folder into a folder with the name <Hl>backup_x.x.x</Hl> (x.x.x is the version before the update). This will usually include your embedded H2 database, your study assets and logs - **but not your MySQL database** (should you have one). If anything goes wrong in the auto-update, you have everything in this backup folder to start the old JATOS again. This backup will use up disk space (therefore you can opt out).

   ![Update notification Schreenshot](/img/autoupdate-update-and-restart.png)

1. After clicking the <Hl>Go on</Hl> button, JATOS will stop itself, replace its program files and re-start itself again. This might take up to a minute.
1. Refresh your JATOS home page every now and then until you see your updated JATOS' login screen again.
1. Check the new JATOS with the build-in tests: go to <Hl>Administration</Hl> ⇒ <Hl>Tests</Hl> and check that all tests are 'OK'.


### Special cases

#### Pre-releases (experimental)
Pre-releases will not be available as auto-updates by default. If you want to force this to be the case (and you know what you're doing), append the parameter <Hl>allowPreReleases</Hl> to your JATOS home page URL (e.g. _localhost/jatos?allowPreReleases_).

#### Enforce an update to a specified version (experimental)
The parameter <Hl>version</Hl> can be added to your JATOS home page URL (e.g. _localhost/jatos?version=v3.6.1_) and takes the version tag as specified in GitHub and enforces an update to this version. This should never be used on a JATOS server that stores any valuable data.

#### Major updates
Auto-updating might not always be possible. JATOS versions will be flagged so that they are not available for auto-update. You'll have to do a [manual update](#Manual-Updates).

#### Versions with newer Java required
JATOS uses Java 11 - older versions use Java 8. Future versions will likely require newer Java versions. If you're updating from a JATOS version using Java 8 to (say) another version using Java 11, the auto-update process will automatically download JATOS bundled with the new Java, regardless of wich variant you are currently using. If you do not like the bundled Java and use your own version you can always remove the folder _jre_ later on after the update.


## Manual Update

To be absolutely safe you can install the new JATOS version and keep the old one untouched. This way you can switch back if something fails. Just remember that only one JATOS can run at the same time. Always stop your old JATOS instance before starting another one.

You can update your local JATOS instance in two main ways (The procedure is a little different if you want to [update JATOS on a server installation](Updating-a-JATOS-server-installation.html)):
 

### First, easy way: discarding your result data

If you don't care about result data stored in JATOS:

1. <Hl>Export</Hl> any studies you wish to keep from the old JATOS installation.
1. Download and install the new version as if it were a new fresh download. Don't start it yet.
1. Stop the old JATOS and start the new JATOS.
1. <Hl>Import</Hl> all the studies your previously exported. This will transfer the files and subfolders in your study's asset folder (HTML, JavaScript, CSS files). 

**What will be transferred:**

1. Files and subfolders in study's <Hl>assets</Hl> folder
1. All your studies' and components' properties
1. The <Hl>properties</Hl> of the first (Default) batch
 
**What will be lost:**

1. **All <Hl>result data</Hl> will be lost**
1. All <Hl>workers</Hl> in all batches (including <Hl>Default batch</Hl>)
1. All <Hl>batches</Hl> other than the <Hl>Default batch</Hl>
1. All <Hl>study logs</Hl>


### Second way: keeping everything (including your result data)

If you do want to keep your studies, batches, and your result data you'll have to move them to the new JATOS. 

1. Stop JATOS (on Unix systems, type `./loader.sh stop` on the terminal. On Windows MS, close your command window)
1. Go to the folder of your old JATOS installation. From there copy your assets root folder to the new JATOS installation (Note: By default your assets root folder is called `study_assets_root` and lays in the JATOS folder but you might have changed this. You can find the location and name in `conf/production.conf`. It is specified in the line beginning with `jatos.studyAssetsRootPath=`.)
1. Go to the folder of your old JATOS installation. From there copy your folder of your uploaded result files to the new JATOS installation (Note: By default this folder is called `result_uploads` and lays in the JATOS folder but you might have changed this. You can find the location and name in `conf/production.conf`. It is specified in the line beginning with `jatos.resultUploads.path=`.)
1. From the folder of your old JATOS installation copy the folders `database` and `study_logs` to the folder of the new JATOS installation.
1. If you had changed the `conf/production.conf` file in your old JATOS instance (for example to set a custom location for your `study_assets_root` folder) you'll have to do this again in the new JATOS version. We recommend re-editing the new version of the file, rather than just overwriting the new with the old version, in case anything in the `production.conf` file has changed.
1. Start the new JATOS (on Unix systems, type `./loader.sh start` on the terminal. On Windows double click the `loader.bat`)
1. Check the build-in tests: go to <Hl>Administration</Hl> ⇒ <Hl>Tests</Hl> and check that all tests are 'OK'.

**What will be transferred:**

1. Files and subfolders in study <Hl>assets</Hl> folder
1. All your <Hl>study</Hl> and <Hl>components properties</Hl>
1. All <Hl>batches</Hl>, together with their <Hl>workers</Hl>, generated <Hl>links</Hl>, and <Hl>results</Hl>
1. All <Hl>study logs</Hl>

**What will be lost:**
nothing
