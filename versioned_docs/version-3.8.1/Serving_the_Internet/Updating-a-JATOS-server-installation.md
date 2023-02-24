---
title: Updating a JATOS server installation
slug: /Updating-a-JATOS-server-installation.html
sidebar_position: 11
---

Updating the server instance is equivalent to doing it [locally](Update-JATOS.html), but make sure that you know what you're doing; especially if you have paired JATOS with a MySQL database.

**Backup your JATOS**

The easiest way to backup is to do a snapshot of the whole server. If you use an external MySQL database with your JATOS, make a backup e.g. using `mysqldump -u yourUserName -p yourDatabaseName > yourDatabaseName.out` - or a snapshot of the whole database server.

As with [updating of a local JATOS installation](Update-JATOS.html) you can do it automatically or manually.

After updating you can check the new JATOS installation with the test page: go to _Administration_ ⇒ _Tests_ and check that all tests are 'OK'.


## Automatic Update (recommended)

This is the easiest way. Then it's [the same as in a local installation](Update-JATOS.html#automatic-updates).

If you did a manual backup before you don't need to do the backup offered during the update process.

## Manual Update (if automatic doesn't work for you)

You have two ways to update manually: 1) Keep your studies but discard all your result data and batches. 2) Keep everything, including your studies and result data (might not always be possible).

### First option: quick and dirty (discarding result data)

You can just follow the [update instructions for the local installation](Update-JATOS.html#first-easy-way-discarding-your-result-data). If you use a MySQL database don't forget to [configure it with a clean and new one](Configure-JATOS-on-a-Server.html) (not the one from your old JATOS). Do not use the new JATOS with the old MySQL database unless you choose to keep your data, as described below.

### Second option: keeping everything

This means that we have to configure the MySQL database or copy the embedded H2 database files.

1. Stop the old JATOS using `./loader.sh stop` 
1. Copy the new JATOS version to your server, e.g. copy it into the same folder where your old JATOS is located. Don't yet remove the old JATOS instance. 
1. Unzip the new JATOS (`unzip jatos.zip`)
1. From the old JATOS installation copy some folders to the new one
   1. Your assets root folder to the new JATOS installation (Note: By default your assets root folder is called `study_assets_root` and lays in the JATOS folder but you might have [changed this](Configure-JATOS-on-a-Server.html).
   1. If exists, your folder for uploaded result files (Note: By default this folder is called `result_uploads` and lays in the JATOS folder but you might have [changed this](Configure-JATOS-on-a-Server.html). 
   1. If exists, `study_logs`
1. Database
   * H2 - If you are using the default H2 database: From your the folder of your old JATOS installation copy the folder `database` to the new JATOS installation. [Remember to stop JATOS before copying the folder](Troubleshooting.html#database-is-corrupted).
   * MySQL - For MySQL you don't have to change anything on the database side.
1. [Configure the new JATOS like the old one](Configure-JATOS-on-a-Server.html) - usually it's enough to copy the `production.conf` from the old `conf` folder into the new one
1. Start the new JATOS using `./loader.sh start`
1. Open JATOS' test page (_Administration_ ⇒ _Tests_) and check that everything is 'OK'
 
