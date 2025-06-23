---
title: Administration
slug: /Administration.html
sidebar_position: 1
---

On the Administration page, [users with admin rights](/User-Manager.html) can get an overview of the studies and users in a JATOS installation. You can view the **logs**, **system info**, or go to the **test page** to check if JATOS is running correctly. This is also where **update notifications** appear when a new JATOS version is available, and where [admins can trigger an update](/Update-JATOS.html#automatic-updates).

![Administration screenshot](/img/v39x/administration.png)

### User Manager

Manage users, passwords, and rights from here. Find more details on [the documentation page](/User-Manager.html).

### Study Manager

By clicking the **Study Manager** button, you'll see an overview of all studies on the JATOS instance. For each study, you can see who it belongs to (the study members), how much disk space it uses, and when it was last active.

**In larger JATOS installations, it can take up to a couple of minutes to gather all data for this page.**

![Study Manager](/img/v39x/study_manager.png)

The information is displayed in a table with the following columns:

* **Active** – If a study uses too many server resources, an admin can **deactivate** (or activate) it by clicking the switch in the 'Active' column. A deactivated study cannot be started by new participants (workers), but an already started study run can be continued. This means an admin will not interrupt a participant who has already started a study, but no new participants will be able to start it. Study members can still view and edit the study, as well as export its result data.
* **ID** – The study ID.
* **Title** – The study title.
* **Members** – The users who are members of this study.
* **Study assets size** – The disk size of all asset files associated with this study (HTML, JS, CSS, images, videos, etc.).
* **Result count** – The number of study results collected so far on this JATOS instance.
* **Result data size** – The size of all result data stored in the database. The average size per result is shown in brackets.
* **Result file size** – The size of all result files stored in the server's file system. The average size per result is shown in brackets.
* **Last started** – The last time this study was started by a participant.
