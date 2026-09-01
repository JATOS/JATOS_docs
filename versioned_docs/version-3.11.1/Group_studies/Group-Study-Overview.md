---
title: Overview
slug: /Group-Studies-Overview
sidebar_position: 1
---

In a group study, workers who belong to the same group can communicate with each other. JATOS supports different types of groups. For example, a group can have a fixed number of workers, as in the [Prisoner's Dilemma](Example-Studies), where exactly two workers play together. At the other end of the spectrum is the [Snake game](Example-Studies), which uses an open group with multiple workers.

### How to Run a Group Study Multiple Times in the Same Browser

When testing or developing a group study, you may want to run the study multiple times in parallel in the same browser.

Since JATOS 3.10, you can do this by clicking the **▼** next to the **Run** button. You can then choose the number of simultaneous runs and how their browser windows should be arranged.

![Multiple study runs](/img/v311x/study_multiple_runs.png)

### Group Overview

Groups are organized at the batch level. To see the groups associated with a particular batch, go to **Study Links**, find the batch, and click **Groups**.

![Groups button](/img/v311x/study_links_groups.png)

The group overview looks similar to this:

![Group overview](/img/v311x/groups_overview.png)

* **Fixed:** Fixes the group, preventing new members from joining and preserving its current composition. This has the same effect as the jatos.js function [`jatos.setGroupFixed`](jatos.js-Reference#jatossetgroupfixed). See [Fixing a Group](Write-Group-Studies-II-JavaScript-and-Messaging#fixing-a-group) for more information.
* **Active workers:** Workers who are currently members of the group.
* **Past workers:** Workers who were previously members of the group.
* **Results:** Study results belonging to this particular group.
* **Group state:** The current state of the group: `START`, `FINISHED`, or `FIXED`.

From this page, you can also view and modify the **Group Session Data** of each group.

Behind the scenes, group studies provide real-time communication between group members. Members can send messages directly to individual members or broadcast them to the entire group.

Next step: [Write Your Own Group Studies](Write-Group-Studies-I-Setup).
