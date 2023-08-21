---
title: Update JATOS
slug: /Update-JATOS.html
sidebar_position: 3
---

We'll periodically update JATOS with new features and bug fixes. We recommend you stay up to date with the [latest release](https://github.com/JATOS/JATOS/releases). However if you are currently running a study it's always safest to keep the same JATOS version throughout the whole experiment.

**Please do backups before updating.**

**Be aware: JATOS is only allowed to update to higher version numbers - downgrading will likely break your installation.**

There are more details about updating in their respective pages:

* [Update JATOS running on a server](/JATOS-on-a-server.html#update-jatos)
* [Update JATOS running in a Docker container](/Install-JATOS-via-Docker.html#updating-jatos-with-docker)
* [Update JATOS running with Docker Compose](/JATOS-with-Docker-Compose.html#updating-jatos-with-docker-compose)
* [Update JATOS running with Kubernetes](/JATOS-in-a-cluster.html#updating-jatos-with-kubernetes)


## Automatic Update

This is the recommended update method for JATOS running locally or on a simple server (but not in a cluster).

You can update your JATOS automatically if you have **admin rights** on JATOS and running on **Mac OS** or **Linux**. **Windows is not yet supported**.

The process is pretty self-explanatory, but anyway, we'll explain it here in detail:

1. You will get a notification on your JATOS' _Administration_ page.

   ![Update notification Schreenshot](/img/autoupdate-notification.png)

   Sometimes your JATOS is not able to receive data about new releases. If this is the case and you know there is a new release that you would like to update to, you can still [start the update by specifying the version](/Update-JATOS.html#auto-update-to-a-specific-version).

1. Click on _Update_, confirm that you want to continue and the latest JATOS version will be downloaded from GitHub and saved in your system's temporary folder. The download might take a while depending on your internet connection.
1. After download is complete, you will be asked again for confirmation. Optionally you can do a **backup**: JATOS will copy the content of its own installation folder into a folder with the name _backup_x.x.x_ (x.x.x is the version before the update). This will usually include your embedded H2 database, your study assets and logs - **but not your MySQL database** (should you have one). If anything goes wrong in the auto-update, you have everything in this backup folder to start the old JATOS again. **This backup will use up disk space** (that is why it is not selected by default).

   ![Update notification Schreenshot](/img/autoupdate-update-and-restart.png)

1. After clicking the _Go on_ button, JATOS will stop itself, replace its program files and re-start itself again. This might take some time depending on the new version and your machine resources, but usually it's done within 2 minutes. Refresh your JATOS home page every now and then until you see your updated JATOS' login screen again.
1. Check the new JATOS with the build-in tests: go to _Administration_ ⇒ _Tests_ and check that all tests are 'OK'.


### (Auto-)Update to a specific version

Sometimes, for whatever reasons, JATOS doesn't autmatically detect new versions then you can still start the update by specifying the version.

**It is usually destructive to update JATOS to a lower version than is currently installed. It's highly recommended to use a higher version (or the same). Use at your own risk.**

The URL of JATOS administration page accepts the query parameter `version`. This parameter takes the JATOS version as specified in [GitHub](https://github.com/JATOS/JATOS/releases) and enforces an update to this version.

E.g. if the version you want to update to is `v3.7.4` (don't forget the 'v') and your domain is `my.jatos.org`, than the URL for your browser is:

```
https://my.jatos.org/jatos/admin?version=v3.7.4
```

The rest of the update procedure is the same as in the normal automatic update: you will be asked for confirmation twice.

---

JATOS uses Java 11 - older versions use Java 8. Future versions will likely require newer Java versions. If you're updating from a JATOS version using Java 8 to (say) another version using Java 11, the auto-update process will automatically download JATOS bundled with the new Java, regardless of which variant you are currently using. If you do not like the bundled Java and use your own version you can always remove the folder _jre_ later on after the update.

---
