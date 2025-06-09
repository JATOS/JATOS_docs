---
title: Submit and upload data to the server 
slug: /Submit-and-upload-data-to-the-server.html
sidebar_position: 8
---

If you've written your study using HTML/JavaScript/CSS, you'll need to know how to send data to the JATOS server for safe storage and easy retrieval. This section describes how to submit data. To learn how to retrieve it, see [Manage Results](Manage-Results.html).

### Submit Result Data

Several `jatos.js` functions allow you to send data to the JATOS server. Result data can be anything convertible to text, such as JSON or CSV formats. Images, audio, or video data can only be sent via file upload (explained below).

The two functions [`jatos.submitResultData`](jatos.js-Reference.html#jatossubmitresultdata) and [`jatos.appendResultData`](jatos.js-Reference.html#jatosappendresultdata) enable you to submit text data to the server. They are similar, with the key difference being that `jatos.submitResultData` overwrites existing data, while `jatos.appendResultData` adds new data to existing records.

Additionally, certain convenience functions, which primarily serve other purposes, also allow you to send result data. These include all functions that initiate a new component (e.g., [`jatos.startNextComponent`](jatos.js-Reference.html#jatosstartnextcomponent), [`jatos.startComponentByPos`](jatos.js-Reference.html#jatosstartcomponentbypos)) and all functions that conclude a study ([`jatos.endStudy`](jatos.js-Reference.html#jatosendstudy) and [`jatos.endStudyAndRedirect`](jatos.js-Reference.html#jatosendstudyandredirect)).

### Upload and Download Result Files

If you need to upload audio, video, images, or any other non-text data, [`jatos.uploadResultFile`](jatos.js-Reference.html#jatosuploadresultfile) is the function you'll need.

Conversely, if you want to access previously uploaded files in a later component, you can download them using [`jatos.downloadResultFile`](jatos.js-Reference.html#jatosdownloadresultfile).

For more practical examples, refer to the ['Drawing' and the 'Video Recording' examples](/Example-Studies).