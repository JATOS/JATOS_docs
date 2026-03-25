---
title: Write Group Studies II - JavaScript and Messaging
slug: /Write-Group-Studies-II-JavaScript-and-Messaging.html
sidebar_position: 3
---

## Writing JavaScript for Group Studies

Group studies differ from single-worker studies in that the JavaScript must handle groups and communication between members. The _jatos.js_ library provides several useful functions for this purpose.

If you want to dive right into the _jatos.js_ reference:

* [_jatos.js_ functions for group studies](jatos.js-Reference.html#group-functions)
* [_jatos.js_ group variables](jatos.js-Reference.html#group-variables)
* [_jatos.js_ Group Session functions](jatos.js-Reference.html#functions-to-access-the-group-session)

---

### Joining a Group and Opening Group Channels

Workers can only communicate with members of their own group, so all interacting workers must join the same group.  
**A worker remains in a group until _jatos.js_ is explicitly told to leave (or the study run finishes). This means that if a worker moves between components or reloads a page, they will still remain in the same group.** This feature makes groups much more robust.

A typical JATOS group study might have three components:

**Component 1**
- `jatos.joinGroup` → joins group and opens group channel
- `jatos.nextComponent` → closes group channel and moves to the next component

**Component 2**
- `jatos.joinGroup` → opens group channel in the **same group**
- `jatos.nextComponent` → closes group channel and moves to the next component

**Component 3**
- `jatos.joinGroup` → opens group channel in the **same group**
- `jatos.endStudy` → closes group channel, leaves group, ends component, and ends study

Notice that calling [`jatos.joinGroup`](jatos.js-Reference.html#jatosjoingroup) in the second and third components does not let workers join a new group, but simply opens a group channel in the already joined group. To make a worker leave a group, use [`jatos.leaveGroup`](jatos.js-Reference.html#jatosleavegroup).

If you want to see who the members of your groups are, or get other stats, click your batch's [Groups button in the Study Links page](Run-your-Study-with-Study-Links.html#groups).

---

### Reassigning to a Different Group

To move a worker from one group to another, use [`jatos.reassignGroup`](jatos.js-Reference.html#jatosreassigngroup). This function will make a worker leave their current group and join a different one. JATOS can only reassign to another group if one is available; if not, the worker will remain in their original group.

---

### Fixing a Group

Sometimes you want to "lock" a group so no new members can join, even if the group properties would allow it. For example, in the [Prisoner's Dilemma Example Study](/Example-Studies), after the group is assembled in the waiting room, you want to keep the two members fixed—even if one leaves during the game, JATOS should not assign a new member. To do this, call [`jatos.setGroupFixed`](jatos.js-Reference.html#jatossetgroupfixed). Alternatively, you can fix a group in the JATOS GUI, in the [Groups table on the Study Links page](Run-your-Study-with-Study-Links.html#groups).

---

## Communication Between Group Members

JATOS provides three ways for group members to communicate: direct messaging, broadcast messaging, and the Group Session.

### Direct Messaging

Members can send direct messages to a single other member of the same group using [`jatos.sendGroupMsgTo`](jatos.js-Reference.html#jatossendgroupmsgto). Like broadcast messaging, this method is fast but can be unreliable if the network connection is unstable. For example, in the [Snake Example](/Example-Studies), direct messaging is used to send the coordinates of the snakes at every step. Here, speed is more important than reliability, since a few dropped frames will likely go unnoticed.

### Broadcast Messaging

Members can send messages to all other members of the same group using [`jatos.sendGroupMsg`](jatos.js-Reference.html#jatossendgroupmsg). Like direct messaging, this method is fast but can be unreliable on unstable networks.

### Group Session

The Group Session is one of the [three types of session that JATOS provides](Session-Data-Three-Types.html). Members can access Group Session data with the [Group Session functions](jatos.js-Reference.html#functions-to-access-the-group-session). Group Session data is stored in JATOS' database **only while the group is active** and is deleted when the group finishes. Communication via Group Session is slower but more reliable than group messaging. If a member has an unstable internet connection or reloads the page, the Group Session will be automatically restored when the group channel is reopened. In the [Prisoner's Dilemma Example Study](/Example-Studies), workers communicate via Group Session data, since a dropped message (direct or broadcast messaging) could result in important information loss.
