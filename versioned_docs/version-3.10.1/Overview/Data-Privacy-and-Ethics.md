---
title: Data privacy and ethics
slug: /Data-Privacy-and-Ethics.html
sidebar_position: 7
---

## Data Privacy and Ethics

Data privacy is a critical consideration for any online study. You should always exercise caution when collecting, storing, and handling data, regardless of the platform you use.

JATOS was developed with data privacy in mind, aiming to support standard ethical research principles. However, you are ultimately responsible for the data you collect and how you use it.

![GUI Screenshot](/img/IMG_1376.JPG)

*(Copyright 2006 John Klossner, www.jklossner.com)*

Below are some key advantages and limitations of JATOS concerning data privacy. Please review them carefully before running any study, and [contact us](Contact-us.html) if you have concerns or suggestions for improvement.

  * **Control over Your Data:** JATOS' primary advantage is that you can store participant data on your own server (e.g., at your university). This gives you full control over the data in your database, ensuring no commercial company has access to it. JATOS does not share any data, except with participants' browsers during a study run. Each JATOS installation operates completely independently.

  * **Default Stored Data:** By default, JATOS stores the following information:

      * **Timestamps:** The server's time when the study and each of its components started and finished.
      * **Worker Type:** The [worker type](Worker-Types.html) used (e.g., MTurk, General Single, Personal Multiple).
      * **MTurk Specifics:** For MTurk workers, JATOS stores both the **confirmation code** and the **MTurk worker ID**. If an MTurk worker participates in multiple studies on the same JATOS instance, you could potentially associate data across those studies. MTurk workers may not be aware that you are the same researcher and can link data from different studies. To avoid this, consider exporting all study data and then deleting it from the JATOS database once your data collection is complete for a study. This ensures JATOS will treat a returning worker as new, assigning them a new worker ID.

  * **Excluded Stored Data:** JATOS **does not** store information such as IP addresses or browser types (User-Agent or other HTTP header fields) by default.

-----

### Things You Should Consider in Your Studies

  * **Right to Withdraw:** Ethical guidelines often require participants to have the right to withdraw from a study at any time without explanation, with all collected data being deleted. You should consider adding an abort button to your study pages. The _jatos.js_ library conveniently offers the `jatos.abortStudy` and `jatos.addAbortButton` functions for this purpose.

  * **Server Encryption:** Use **HTTPS** for your [server instance](JATOS-on-a-server.html). Encryption prevents unauthorized parties on the internet from reading private participant data from your study.

  * **JavaScript-Accessed Data:** Although JATOS doesn't store IP addresses or browser types by default, your JavaScript code could potentially access and store this information. Your scripts could also record if participants are actively on the browser tab running your study or if they have switched to another tab, window, or program. If you collect any of these data points, you should inform your participants.

  * **Study Assets:** Be aware that anyone with a [study link](Run-your-Study-with-Study-Links.html) can access all files in your study assets folders, including those not actively used by your study. **Therefore, you must never store any private information, such as participant details, within the study assets folders.**

  * **Session Data Privacy:**
      * **Do not store private information in the Batch Session or Group Session.** These sessions are shared among all members of a batch or group, respectively. Storing private data there could allow other members of that batch or group to access it.
      * Since the **Study Session** is shared only within the same individual study run, it is generally safe to store private information there.

-----

### Cookies Used by JATOS

It is sometimes necessary to specify which cookies are stored in a participant's browser. JATOS uses three types of cookies, with only two of them stored in participants' browsers during a study run.

#### 1. JATOS ID Cookies (`JATOS_IDS_*`)

JATOS uses multiple `JATOS_IDS_*` cookies (where `*` is a number). These cookies store values related to individual study runs.

All IDs are for internal JATOS use only and do not allow for the direct identification of a worker.

These cookies are set to expire after one year.

[`HttpOnly`](https://www.owasp.org/index.php/HttpOnly) is set to `false`, meaning these cookies can be read by JavaScript in the browser.

Each cookie contains the following parameters:

  * `studyId`: Identifier of the study.
  * `batchId`: Identifier of the batch.
  * `componentId`: Identifier of the component.
  * `componentPos`: Position of the component within the study.
  * `workerId`: Internal identifier for the worker, used anonymously.
  * `workerType`: One of [five worker types with different use cases in JATOS](Worker-Types.html).
  * `componentResultId`: Identifier for the data collected in a specific component run.
  * `studyResultId`: Identifier for the data collected in this overall study run.
  * `studyResultUuid`: Universal identifier for the study result.
  * `groupResultId`: Identifier of the group the worker belongs to (null if not a group study).
  * `creationTime`: Timestamp (epoch time) of the cookie's creation.
  * `studyAssets`: Name of the directory where the study's assets are stored on the JATOS server.
  * `jatosRun`: State of a study run with a JatosWorker. This field is null if the run doesn't belong to a JatosWorker. It primarily distinguishes between a full study run and a component-only run.
  * `urlBasePath`: [Base path under which JATOS resides](JATOS_Configuration.html#url-base-path-jatos).

**Example:** `batchId=1&componentId=1&componentPos=1&componentResultId=35&creationTime=1639502424728&studyAssets=jatosjs_test_study&urlBasePath=/&jatosRun=RUN_STUDY&groupResultId=null&studyId=1&studyResultId=33&studyResultUuid=7d5b3da2-b0bf-4e22-98bc-f0e5d7752c00&workerId=1&workerType=Jatos`

#### 2. `JATOS_GENERALSINGLE_UUIDS` Cookie

This cookie is used by JATOS to track which study runs, involving a [General Single worker](Worker-Types.html#general-single-worker-and-study-link), have already occurred in the browser. It stores only a list of UUIDs that uniquely identify a study.

#### 3. Play Framework Session Cookie (`PLAY_SESSION`)

This cookie is used exclusively by JATOS' GUI to manage session and user information. It is **not** set during a study run and therefore does **not** store any worker-related data.

The cookie's `expires` header field is set to "Session," meaning it will be deleted when the browser is closed.

[`HttpOnly`](https://www.owasp.org/index.php/HttpOnly) is set to `true`, which means it cannot be read by JavaScript within the browser.

This cookie contains the following parameters:

  * `username`: Username of the logged-in user (often an email).
  * `sessionID`: Play's session ID.
  * `loginTime`: Timestamp of the user's login time in the GUI.
  * `lastActivityTime`: Timestamp of the user's last activity time in the GUI.

Additionally, [Play](https://www.playframework.com/documentation/2.9.x/SettingsSession#Session-Configuration) stores a hash of the entire cookie's data to verify its integrity.

**Example:** `PLAY_SESSION:"b6c01f2fa796603491aaed94168651b54b154ca1-username=admin&sessionID=4k1atg9ugeavmegk88n41stfr4&loginTime=1524935558364&lastActivityTime=1524947602543"`