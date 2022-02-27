---
title: Data Privacy and Ethics
slug: /Data-Privacy-and-Ethics.html
sidebar_position: 7
---
import Hl from '@site/src/components/Highlight';

### What does JATOS store?

Data privacy is a critical issue in online studies. You should be careful when collecting, storing and handling data, regardless of which platform you use to run your studies. 

We developed JATOS with data privacy in mind, preventing any breaches of the standard ethical principles in research. However, ultimately you are responsible for the data you collect and what you do with it. 

![GUI Screenshot](/img/IMG_1376.JPG)

(copyright 2006 John klossner, www.jklossner.com)

Here are a few advantages and limitations of JATOS with regards to data privacy. Please read them carefully before you run any study, and please [contact us](Contact-us.html) if you find that these are not sufficient, or have suggestions for improvement.  

* JATOS' main advantage is that you can store your participants' data in your own server (e.g. at your university). This means that you have full control over the data stored in your database, and no commercial company has access to it. JATOS does not share any data (except of course during a study run with the participant's browsers). Each JATOS installation is completely independent of any other JATOS installation.

* By default, JATOS stores the following data: 
  * time (of the server running JATOS) at which the study -and each of its components- was started and finished
  * the [worker type](Worker-Types.html) (MTurk, General single, Personal multiple, etc) 
  * in cases of <Hl>MTurk</Hl> workers, the confirmation code AND the MTurk worker ID. In these cases, if an MTurk worker participated in two of your studies, running in the same JATOS instance, **you will be able to associate the data across these two studies**. This is an important issue: <Hl>MTurk</Hl> workers might not be aware that you are the same researcher, and will not know that you have the chance to associate data from different studies. The best way to avoid this is to export all your study's data and delete it from the JATOS database once you are done with it. In this way, JATOS won't know that a worker already participated in another study and will create a new worker ID for them.   

* JATOS will **not** store information like IP address or browser type (User-Agent or any other HTTP header field).

### Things you should consider in your studies 

* You should consider to add some button in your study pages to abort the study. Some ethics demand that any participant should have the **right to withdraw** at any time, without explanation. In this case all data of the participant gathered during the study should be deleted. Conveniently **jatos.js** offers the functions [`jatos.abortStudy`](jatos.js-Reference.html#jatosabortstudy) and [`jatos.addAbortButton`](jatos.js-Reference.html#jatosaddabortbutton) that do exactly that.

* Use **encryption** with your [server instance](JATOS-on-a-server.html). Only with encryption no one else in the internet can read the private data from your study's participants.

* JATOS will **not** store information like IP address or browser type (nor any other HTTP header field). However, you could access and store this information through your JavaScripts. You could also record whether workers are actively on the browser tab running your study, or whether they have left it to go to another tab, window or program. If you collect any of these data, you should let your workers know. 

* Bear in mind: Every file within your study assets folders is public to the Internet. Anybody can in principle read any file in this folder, regardless of how secure your server is. **Thus, you should never store any private data, such as participants' details in the <Hl>study assets</Hl> folders.**

* **Do not store private information in the <Hl>Batch Session</Hl> or <Hl>Group Session</Hl>.** Both sessions are shared between all members of a batch or group respectively. If you store private data any other member of this batch or group could potentially access it. Since the Study Session is only shared within the same study run it is not a problem to store private information there.

### Cookies used by JATOS

Sometimes it is neccessary to specify which cookies are stored in a participants browser. JATOS knows three types of cookies and only two of them are stored in a participants browser.

#### 1. Up to ten JATOS ID cookies with cookie name JATOS_IDS_* (* can be a number from 0 to 9)

These cookies store values about each study run. JATOS allows up to 10 study runs in parallel per browser - therefore there are up to 10 JATOS ID cookies.

All IDs are used only by JATOS internally and do not allow the identification of the worker.

The cookie virtually never expires (actually far in the future, around the year 2086).

[HttpOnly](https://www.owasp.org/index.php/HttpOnly) is set to false (this means, it can be read by JavaScript in the browser).

This cookie contains these parameters:

* <Hl>studyId</Hl>: identifier of the study
* <Hl>batchId</Hl>: identifier of the batch
* <Hl>componentId</Hl>: identifier of the component
* <Hl>componentPos</Hl>: position of the component within the study
* <Hl>workerId</Hl>: identifier of the worker used internally to identify the worker anonymously
* <Hl>workerType</Hl>: there are [5 worker types with different use cases in JATOS](Worker-Types.html)
* <Hl>componentResultId</Hl>: identifier of the component result (a component result is used to store data of the component run)
* <Hl>studyResultId</Hl>: identifier of the study result (a study result is used to store data of this study run)
* <Hl>studyResultUuid</Hl>: universial identifier of the study result (a study result is used to store data of this study run)
* <Hl>groupResultId</Hl>: identifier of the group this worker belongs to (null if it isn't a group study)
* <Hl>creationTime</Hl>: timestamp (epoch time) of this cookie's creation
* <Hl>studyAssets</Hl>: name of the directory where the study's assets are stored on the JATOS server
* <Hl>jatosRun</Hl>: State of a study run with a JatosWorker. If this run doesn't belong to a JatosWorker this field is null. It's mainly used to distinguish between a full study run and just a component run.
* <Hl>urlBasePath</Hl>: [Base path under which JATOS resides](Configure-JATOS-on-a-Server.html#url-base-path-jatos--v331)

E.g. `batchId=1&componentId=1&componentPos=1&componentResultId=35&creationTime=1639502424728&studyAssets=jatosjs_test_study&urlBasePath=/&jatosRun=RUN_STUDY&groupResultId=null&studyId=1&studyResultId=33&studyResultUuid=7d5b3da2-b0bf-4e22-98bc-f0e5d7752c00&workerId=1&workerType=Jatos`

#### 2. Cookie JATOS_GENERALSINGLE_UUIDS

This cookie is used by JATOS to store which study runs with a [<Hl>General Single worker</Hl>](Worker-Types.html#general-single-worker) already happened in this browser. It only stores a list of IDs that universally identifies a study (UUID).

#### 3. Play Framework session cookie named PLAY_SESSION

This cookie is used only by JATOS' GUI and provides session and user info. It is **not** set during a study run and therefore does **not** store any worker related information.

The cookie's expires header field is set to Session, which mean that after the browser is closed the cookie will be deleted.

[HttpOnly](https://www.owasp.org/index.php/HttpOnly) is set to true (this means, it can't be read by JavaScript within the browser).

This cookie contains the parameters:

* <Hl>username</Hl>: username of the logged-in user (often an email)
* <Hl>sessionID</Hl>: Play's session ID
* <Hl>loginTime</Hl>: user's login time in the GUI as a timestamp
* <Hl>lastActivityTime</Hl>: user's last activity time in the GUI as a timestamp

Additionally Play stores a hash of the whole cookie's data to check integrity of the cookie's data.

E.g. `PLAY_SESSION:"b6c01f2fa796603491aaed94168651b54b154ca1-username=admin&sessionID=4k1atg9ugeavmegk88n41stfr4&loginTime=1524935558364&lastActivityTime=1524947602543"`
