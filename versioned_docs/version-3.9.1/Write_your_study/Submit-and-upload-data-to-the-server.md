---
title: Submit and upload data to the server 
slug: /Submit-and-upload-data-to-the-server.html
sidebar_position: 8
---

If you wrote your study with HTML/JavaScript/CSS, you'll need to know how to send to the JATOS server for safe storage and easy later retrieval. Here we describe how to submit data. See [Manage Results](Manage-Results.html) to know how to retrieve it.


### Submit result data

There are a couple of _jatos.js_ functions that allow you to send data to the JATOS server. The result data can be anything that can be put into text, which includes formats like JSON or CSV. Images, audio or video data can only be sent via Upload (explained below).

The two functions [`jatos.submitResultData`](jatos.js-Reference.html#jatossubmitresultdata) and [`jatos.appendResultData`](jatos.js-Reference.html#jatosappendresultdata) let you submit text data to the server. They are similar to each other. The only difference is that the first overwrites the data and therefore deletes previously sent data, while the latter appends new data to old data. 

Then there are a couple of functions that do something else (primarily) but allow you to send result data out of convenience, since they usually go together anyway. These are all functions that start a new component (e.g. [`jatos.startNextComponent`](jatos.js-Reference.html#jatosstartnextcomponent), [`jatos.startComponentByPos`](jatos.js-Reference.html#jatosstartcomponentbypos)) and all functions that end a study ([`jatos.endStudy`](jatos.js-Reference.html#jatosendstudy) and [`jatos.endStudyAndRedirect`](jatos.js-Reference.html#jatosendstudyandredirect)).

Sending data to a server can take some time, depending on the internet connection and the size of the result data. The convenience functions have the advantage that they will execute their primary function (e.g. start next component) only *after* the result data have been submitted. Therefore these are generally safer ways to submit your result data. 

### Upload and download result files

If you want to upload audio, video, images or any other data that is not in text format, then uploading a result file is what you need: [`jatos.uploadResultFile`](jatos.js-Reference.html#jatosuploadresultfile). 

And if you want to, in a later component, access the uploaded files again you can download them with [`jatos.downloadResultFile`](jatos.js-Reference.html#jatosdownloadresultfile).

For more real-world examples have a look at the ['Drawing' and the 'Video Recording' examples](/Example-Studies).
