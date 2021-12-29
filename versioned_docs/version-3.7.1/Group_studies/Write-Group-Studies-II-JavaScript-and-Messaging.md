---
title: Write Group Studies II - JavaScript and Messaging
slug: /Write-Group-Studies-II-JavaScript-and-Messaging.html
sidebar_position: 3
---

## Writing JavaScripts for group studies

Group studies differ from single-worker studies simply in that the JavaScript needs to handle groups and communications between members. The jatos.js library provides some useful functions for this.

If you like to dive right into jatos.js' reference:

* [jatos.js functions for group studies](jatos.js-Reference.html#functions-for-group-studies)
* [jatos.js group variables](jatos.js-Reference.html#group-variables)
* [jatos.js Group Session functions](jatos.js-Reference.html#functions-to-access-the-group-session)

### Joining a group and opening group channels

There are two requisites for allowing group members to interact:

1. Workers can only communicate with members of their own group. So, interacting workers must all join the same group. 
**A worker will remain in a group until jatos.js is explicitly told to leave the group (or the study run is finished). This means that if a worker moves between components or reloads a page they will remain in the same group.** This feature makes groups much more robust. 

1. Communication can only be done if a group channel is open. Although jatos.js opens and closes all necessary group channels so you don't have to care for them directly while writing components. Group channels in turn use [WebSockets](https://en.wikipedia.org/wiki/WebSocket). WebSockets are supported by [all modern browsers](http://caniuse.com/#feat=websockets). 

So here's how a typical JATOS group study run would look like:

Component 1

  * _jatos.joinGroup_ -> joins group and opens group channel
  * _jatos.nextComponent_ -> closes group channel and jumps to next component

Component 2

  * _jatos.joinGroup_ -> opens group channel in the **same group**
  * _jatos.nextComponent_ -> closes group channel and jumps to next component

Component 3

  * _jatos.joinGroup_ -> opens group channel **same group**
  * _jatos.endStudy_ -> closes group channel, leaves group, ends component, and ends study

Notice that by calling _[jatos.joinGroup](jatos.js-Reference.html#jatosjoingroupcallbacks)_ in the second and third component JATOS does not let workers join a new group but just  opens a group channel in the already joined group. To make a worker leave a group,  use the function [_jatos.leaveGroup_](jatos.js-Reference.html#jatosleavegroup).

Every know and then you probably would like to know who the members of your groups are. This and other stats you can get by clicking on your batch's [**Groups** button in the Worker & Batch Manger](/Run-your-Study-with-Study-Links.html#groups-since-v331).

### Reassigning to a different group

To move a worker from one group to a different one, use [_jatos.reassignGroup_](jatos.js-Reference.html#jatosreassigngroup). This function will make a worker leave their group and join a different one. JATOS can only reassign to a different group if there is another group available. If there is no other group JATOS will not start a new one but put the worker into the same old group again.  

### Fixing a group

Sometimes you want to stay with the group like it is in the moment and don't let new members join - although it would be allowed according to the group properties. For example in the [Prisoner's Example study](Example-Studies.html#prisoners-dilemma) after the group is assembled in the waiting room component it is necessary to keep the two members as it is. Even if one of the members leaves in the middle of the game, JATOS shouldn't just assign a new member. To do this you can call jatos.js' function [_jatos.setGroupFixed_](jatos.js-Reference.html#jatossetgroupfixed). Alternatively you can fix a group in JATOS' GUI, in the [groups table](/Run-your-Study-with-Study-Links.html#groups-since-v331). 

## Communication between group members

JATOS provides three ways for communicating within the group: direct messaging, broadcast messaging and via the Group Session.

### Direct messaging
Members can send direct messages to a single other member of the same group with the [_jatos.sendGroupMsgTo_](jatos.js-Reference.html#jatossendgroupmsgto) function. Like broadcast messaging this way of group communication is fast but can be unreliable in case of an unstable network connection. We use direct messaging in the [Snake example](Example-Studies.html#snake) to send the coordinates of the snakes on every step. Here, speed is more critical than reliability in the messages, because a few dropped frames will probably go unnoticed. 

### Broadcast messaging
Members can send messages to all other members of the same group with the [_jatos.sendGroupMsg_](jatos.js-Reference.html#jatossendgroupmsg) function. Like direct messaging this way of group communication is fast but can be unreliable in case of an unstable network connection.

### Group session
The Group Session is one of the [three types of session that JATOS provides](Session-Data-Three-Types.html). Members can access the Group Session data with the [Group Session functions](jatos.js-Reference.html#functions-to-access-the-group-session). The Group Session data are stored in JATOS' database **only while the group is active. It is deleted when the group is finished.** Communication via Group Session is slower, but more reliable than group messaging. If one member has an unstable internet connection or does a page reload, the Group Session will be automatically restored after the member reopens the group channel. Workers communicate via the Group Session data in the [Prisoner's Example study](Example-Studies.html#prisoners-dilemma), because here one dropped message would lead to important information loss.
