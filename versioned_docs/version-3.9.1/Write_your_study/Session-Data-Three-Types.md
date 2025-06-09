---
title: Session data - Three types
slug: /Session-Data-Three-Types.html
sidebar_position: 9
---
-----

### When to Use the Sessions?

<div style={{float: 'right'}}>

![](/img/three_session_types.png)

</div>

In JATOS, you often need to store and share information during a study run, either with other components of the same study or among workers within a group or batch. The three distinct session types (illustrated by the curved arrows in the image to the right) enable this data transfer. Workers can write data into these sessions using `jatos.js`.

The data stored in sessions are **volatile**; they are not meant for permanent storage. Instead, any information critical for data analysis should be stored in the **result data** or **result files**. Unlike session data, result data are permanently saved on the JATOS server and are never automatically deleted.

Furthermore, session data are not included when a study is exported or imported. If you need data to be exported with a study, use the **study input** or **component input** fields defined in your study or component properties instead.

<br clear="right" />

-----

### Comparative Overview of Session Types

| | Batch Session | Group Session | Study Session |
|---|---|---|---|
| **Scope (Accessible by)** | All workers in a batch | All workers in a group | All components in a single study run |
| **Usage** | Exchange and store data relevant for all members of a batch | Exchange and temporarily store data relevant for all members of a group | Exchange and temporarily store data between components of a single study run |
| **Example Use** | (Pseudo-)randomly assign conditions to different workers; Combine results from different groups working in the same batch | Store choices of the two members of a Prisoner's Dilemma game | Pass on correct answers between components; Keep track of the number of iterations for a repeated component |
| **Lifetime** | Survives after all workers finish their studies | Automatically deleted once the group is finished | Deleted once the worker finishes the study – hence temporary |
| **Updated When and Via** | Any time you call one of the [`jatos.batchSession` functions](/jatos.js-Reference.html#batch-session-functions) | Any time you call one of the [`jatos.groupSession` functions](/jatos.js-Reference.html#group-session-functions) | At the end of each component or if you call [`jatos.setStudySessionData`](/jatos.js-Reference.html#jatossetstudysessiondata) |
| **Visible and editable from JATOS' GUI** | ![yes](/img/ok-24.ico) | ![yes](/img/ok-24.ico) | ![no](/img/x-24.ico) |
| **Requires WebSockets** | ![yes](/img/ok-24.ico) | ![yes](/img/ok-24.ico) | ![no](/img/x-24.ico) |
| **Included in exported studies** | ![no](/img/x-24.ico) | ![no](/img/x-24.ico) | ![no](/img/x-24.ico) |

-----

### Example Study

We provide an [example study](/Example-Studies) that demonstrates the three different session types in action. Try it yourself:

1.  **Download and import the study.** You'll find that the study contains two components: "First" and "Second."

2.  **Run the study once.** The easiest way is as a JATOS worker (simply click 'Run' on the study bar, not on any of the component bars).

3.  The first component will prompt you for a name. It will then write the name you enter into the **Study Session**. Because all components have access to the Study Session, the second component can read this name and use it in a chat window.

    ![First component screenshot](/img/ChatExample_1.png)

4.  When you click 'Next', the second component will load. Here you will see two chat windows: The left one is labeled "group chat" because it uses the Group Session; the right one is labeled "batch chat" because it uses the Batch Session. For now, you are alone in these chat rooms. Without closing this current run, **open two more browser tabs and run the study at least two more times.** You can choose any study link type you want.

    ![Second component screenshot](/img/ChatExample_2.png)

5.  You now have three simultaneous study runs. While writing into the group chat, you'll notice that two of your workers are in the same group, while the third is in their own group. Why two per group? Because we [set the groups to a maximum of two members each](Write-Group-Studies-I-Setup.html#group-settings-in-each-batchs-properties). The group chat uses the **Group Session** to enable communication between the two members of each group. Members of other groups will not have access to these specific group chats. However, anything written into the **Batch Session** will be accessible by all workers who are part of that batch, regardless of the group they are in.

   ![Second component screenshot](/img/ChatExample_3.png)
   ![Second component screenshot](/img/ChatExample_4.png)
