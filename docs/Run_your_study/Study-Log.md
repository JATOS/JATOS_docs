---
title: Study log
slug: /Study-Log.html
sidebar_position: 10
---

JATOS maintains a dedicated **log file for each study** (not to be confused with [JATOS' application-wide log](Troubleshooting.html#read-log-file-in-the-browser)). This file records every relevant event that occurs within a study, most importantly when a component result was saved, exported, or deleted.

Crucially, the log also contains a **hash** – a unique string generated from the content of the result data itself. In principle, this hash allows any JATOS user to verify that the data has not been modified and that no result was deleted between data collection and publication, thus ensuring **data integrity**.

You can view the study log by clicking on **More** in the study toolbar, then selecting **Study log**:

![Study Log button](/img/v39x/study_log_button.png)

The log will then appear similar to this:

![Study Log pretty](/img/v39x/study_log_pretty.png)

**A Few More Details:**

  * The study log won't be necessary in most cases but serves as a useful record for specific situations (see further down).
  * In the JATOS GUI, you will only see the **last 100 entries** of the study log. However, you can download the complete log file.
  * The log displayed in the GUI is in **reversed chronological order** (newest entries first), while the downloaded file presents events in **normal chronological order**.
  * The following events are logged: **study creation/deletion**, **study run/finish**, **result data storage**, **result file upload**, and **result data export**.
  * When result data is stored or a result file is uploaded, a hash of the data is logged. Since a hash changes if the original result is altered or deleted, this feature can help prove **data integrity** if ever questioned (Note: the hash used is "SHA-256").
  * The security of the study log is contingent on the security of the server machine running JATOS. Anyone with direct access to the server could potentially modify the study log file (e.g., to hide deleted data). Therefore, it is critical to ensure your server is secure and accessible only by authorized administrators.
  * The study log displayed in the GUI is in **JSON format**. You can choose to view it in **pretty** (formatted, as in the screenshot above) or **raw** mode. The downloaded lok is in **JSON lines** format.

